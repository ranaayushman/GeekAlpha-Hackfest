import streamlit as st
import pandas as pd
import joblib
import yfinance as yf
import numpy as np
import plotly.express as px
import plotly.graph_objects as go
from math import pi

# Load trained model and scaler
model = joblib.load("investment_model.pkl")
scaler = joblib.load("scaler.pkl")

# Function to calculate Risk Score
def calculate_risk(stock_data):
    beta = stock_data['Close'].pct_change().rolling(window=20).corr(stock_data['SMA50'])
    sharpe_ratio = stock_data['Close'].pct_change().mean() / stock_data['Close'].pct_change().std()
    volatility = stock_data['Close'].pct_change().rolling(window=20).std()
    drawdown = (stock_data['Close'] / stock_data['Close'].cummax()) - 1

    latest_beta = beta.iloc[-1]
    latest_volatility = volatility.iloc[-1]
    latest_sharpe = sharpe_ratio
    latest_drawdown = drawdown.iloc[-1]

    # Determine risk category
    if latest_beta < 1 and latest_volatility < 0.02 and latest_drawdown > -0.15:
        risk_category = 'Low'
        trust_score = '⭐⭐⭐⭐'
    elif latest_beta < 1.5 and latest_volatility < 0.05:
        risk_category = 'Medium'
        trust_score = '⭐⭐⭐'
    else:
        risk_category = 'High'
        trust_score = '⭐⭐'

    return risk_category, trust_score

# Function to fetch stock data
def fetch_stock_data(stock_name, period="5y"):
    stock = yf.Ticker(stock_name)
    stock_data = stock.history(period=period)

    if stock_data.empty:
        return None, None, None

    stock_data['SMA20'] = stock_data['Close'].rolling(window=20).mean()
    stock_data['SMA50'] = stock_data['Close'].rolling(window=50).mean()
    stock_data['Volatility'] = stock_data['Close'].pct_change().rolling(window=20).std()
    stock_data['Momentum'] = stock_data['Close'].diff().rolling(window=10).mean()
    stock_data['RSI'] = 100 - (100 / (1 + stock_data['Close'].pct_change().rolling(14).mean() / stock_data['Close'].pct_change().rolling(14).std()))
    stock_data['Beta'] = stock_data['Close'].pct_change().rolling(window=20).corr(stock_data['SMA50'])
    stock_data['Sharpe Ratio'] = stock_data['Close'].pct_change().mean() / stock_data['Close'].pct_change().std()
    stock_data.dropna(inplace=True)

    risk_category, trust_score = calculate_risk(stock_data)

    return stock_data, risk_category, trust_score

# Function to recommend similar stocks
def recommend_similar_stocks(stock_name):
    stock_list = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'NFLX', 'NVDA', 'META', 'BABA', 'JPM']
    stock_list.remove(stock_name) if stock_name in stock_list else None
    return np.random.choice(stock_list, 5, replace=False)

# Streamlit UI
st.title("📈 Stock Analysis & Risk Insights")

stock_name = st.text_input("Enter Stock Symbol (e.g., AAPL, TSLA, MSFT):", "AAPL")
period = st.selectbox("Select Data Range:", ["1y", "5y", "10y"], index=1)

data, risk_category, trust_score = fetch_stock_data(stock_name, period)

if data is not None:
    latest = data.iloc[-1]
    recommended_stocks = recommend_similar_stocks(stock_name)

    st.subheader(f"Risk Factor for {stock_name}")
    safety_meter = "🟢 Low Risk" if risk_category == 'Low' else ("🟡 Medium Risk" if risk_category == 'Medium' else "🔴 High Risk")
    st.write(f"**Trust Score:** {trust_score}")
    st.write(f"**Safety Meter:** {safety_meter}")

    st.subheader("Investment Calculator")
    investment_amount = st.number_input("Enter investment amount ($):", min_value=100, value=1000, key='investment_input')
    if 'investment_value' not in st.session_state:
        st.session_state['investment_value'] = 0
    if st.button("Calculate Investment"):
        initial_price = data.iloc[0]['Close']
        final_price = latest['Close']
        investment_value = (investment_amount / initial_price) * final_price
        st.session_state['investment_value'] = investment_value
    st.write(f"Your investment would be worth: ${st.session_state['investment_value']:.2f}")

    st.write(f"**Projected Returns:** ₹10,000 → ₹{10000 * (latest['Close'] / data.iloc[0]['Close']):.2f} in 1 year 📈")

    latest_features = np.array([[latest['Close'], latest['Volume'], latest['SMA20'], latest['SMA50'], latest['Volatility']]])
    latest_features_scaled = scaler.transform(latest_features)
    prediction = model.predict(latest_features_scaled)
    advice_mapping = {0: "Good", 1: "Medium", 2: "Bad"}
    investment_advice = advice_mapping.get(prediction[0], "Unknown")

    st.subheader("📊 Investment Advice")
    st.write(f"**Recommendation:** {investment_advice}")

    st.subheader(f"Stock Insights for {stock_name}")
    st.write(f"**Closing Price:** ${latest['Close']:.2f}")
    st.write(f"**20-day SMA:** ${latest['SMA20']:.2f}")
    st.write(f"**50-day SMA:** ${latest['SMA50']:.2f}")
    st.write(f"**Volatility:** {latest['Volatility']:.2f}")
    st.write(f"**Momentum:** {latest['Momentum']:.2f}")
    st.write(f"**RSI:** {latest['RSI']:.2f}")

    st.subheader("Recommended Similar Stocks")
    st.write(", ".join(recommended_stocks))

    st.subheader("Stock Price Trend")
    fig = px.line(data, x=data.index, y=['Close', 'SMA20', 'SMA50'], labels={'value': 'Price ($)', 'index': 'Date'}, title="Stock Price Trend")
    st.plotly_chart(fig)

    st.subheader("Stock Volatility Over Time")
    fig = px.line(data, x=data.index, y='Volatility', labels={'Volatility': 'Volatility Level', 'index': 'Date'}, title="Stock Volatility Over Time")
    st.plotly_chart(fig)

    st.subheader("Momentum Indicator")
    fig = px.line(data, x=data.index, y='Momentum', labels={'Momentum': 'Momentum', 'index': 'Date'}, title="Momentum Indicator")
    st.plotly_chart(fig)

    st.subheader("RSI Indicator")
    fig = px.line(data, x=data.index, y='RSI', labels={'RSI': 'RSI', 'index': 'Date'}, title="RSI Indicator")
    fig.add_hline(y=70, line_dash="dash", line_color="red", annotation_text="Overbought")
    fig.add_hline(y=30, line_dash="dash", line_color="green", annotation_text="Oversold")
    st.plotly_chart(fig)

    st.subheader("Comparison with Recommended Stocks")
    fig = go.Figure()
    returns_summary = []
    radar_data = []
    for rec_stock in recommended_stocks:
        rec_data, rec_risk, _ = fetch_stock_data(rec_stock, period)
        if rec_data is not None:
            percent_return = ((rec_data['Close'].iloc[-1] - rec_data['Close'].iloc[0]) / rec_data['Close'].iloc[0]) * 100
            returns_summary.append((rec_stock, percent_return))
            fig.add_trace(go.Scatter(x=rec_data.index, y=rec_data['Close'], mode='lines', name=rec_stock))
            # Radar data
            radar_data.append({
                'Stock': rec_stock,
                'Return': percent_return,
                'Volatility': rec_data['Volatility'].mean() * 100,
                'RSI': rec_data['RSI'].mean(),
                'Momentum': rec_data['Momentum'].mean()
            })
    fig.add_trace(go.Scatter(x=data.index, y=data['Close'], mode='lines', name=stock_name, line=dict(width=4)))
    fig.update_layout(title="Stock Comparison", xaxis_title="Date", yaxis_title="Price ($)")
    st.plotly_chart(fig)

    st.subheader("📈 % Return Comparison")
    returns_df = pd.DataFrame(returns_summary, columns=["Stock", "% Return"]).sort_values(by="% Return", ascending=False)
    st.bar_chart(returns_df.set_index("Stock"))

    top_performer = returns_df.iloc[0]
    st.success(f"🏆 Top Performer: {top_performer['Stock']} ({top_performer['% Return']:.2f}%)")

    st.subheader("💰 Mini Investment Simulation")
    sim_df = returns_df.copy()
    sim_df['Projected Value ($)'] = investment_amount * (1 + sim_df['% Return'] / 100)
    st.dataframe(sim_df.set_index("Stock"))

    st.subheader("📊 Spider Chart (Radar)")
    categories = ['Return', 'Volatility', 'RSI', 'Momentum']
    radar_fig = go.Figure()
    for stock_stats in radar_data:
        radar_fig.add_trace(go.Scatterpolar(
            r=[stock_stats[c] for c in categories],
            theta=categories,
            fill='toself',
            name=stock_stats['Stock']
        ))
    radar_fig.update_layout(polar=dict(radialaxis=dict(visible=True)), showlegend=True)
    st.plotly_chart(radar_fig)

else:
    st.error("Invalid stock symbol or no data available. Please try again.")
