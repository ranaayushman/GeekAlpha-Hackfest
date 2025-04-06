from flask import Flask, request, jsonify
import yfinance as yf
import pandas as pd
import numpy as np
import joblib

app = Flask(__name__)

# Load model, scaler, and similarity matrix
model = joblib.load("investment_model.pkl")
scaler = joblib.load("scaler.pkl")
similarity_df = joblib.load("similarity_matrix.pkl")  # This must be saved during training

def calculate_risk(stock_data):
    beta = stock_data['Close'].pct_change().rolling(window=20).corr(stock_data['SMA50'])
    sharpe_ratio = stock_data['Close'].pct_change().mean() / stock_data['Close'].pct_change().std()
    volatility = stock_data['Close'].pct_change().rolling(window=20).std()
    drawdown = (stock_data['Close'] / stock_data['Close'].cummax()) - 1

    latest_beta = beta.iloc[-1]
    latest_volatility = volatility.iloc[-1]
    latest_drawdown = drawdown.iloc[-1]

    if latest_beta < 1 and latest_volatility < 0.02 and latest_drawdown > -0.15:
        return 'Low', '⭐⭐⭐⭐'
    elif latest_beta < 1.5 and latest_volatility < 0.05:
        return 'Medium', '⭐⭐⭐'
    else:
        return 'High', '⭐⭐'

def recommend_similar_stocks(stock_name, top_n=5):
    if stock_name not in similarity_df.index:
        return []
    similar_scores = similarity_df[stock_name].sort_values(ascending=False)
    recommended = similar_scores.drop(index=stock_name).head(top_n).index.tolist()
    return recommended

@app.route('/analyze', methods=['GET'])
def analyze_stock():
    stock_name = request.args.get('stock', default='AAPL')
    period = request.args.get('period', default='5y')

    stock = yf.Ticker(stock_name)
    data = stock.history(period=period)

    if data.empty:
        return jsonify({'error': 'Stock data not found'}), 404

    data['SMA20'] = data['Close'].rolling(window=20).mean()
    data['SMA50'] = data['Close'].rolling(window=50).mean()
    data['Volatility'] = data['Close'].pct_change().rolling(window=20).std()
    data['Momentum'] = data['Close'].diff().rolling(window=10).mean()
    data.dropna(inplace=True)

    if data.empty:
        return jsonify({'error': 'Not enough data after preprocessing'}), 400

    latest = data.iloc[-1]

    risk_category, trust_score = calculate_risk(data)

    features = np.array([[latest['Close'], latest['Volume'], latest['SMA20'], latest['SMA50'], latest['Volatility']]])
    scaled = scaler.transform(features)
    prediction = model.predict(scaled)[0]

    prediction_map = {0: 'Good', 1: 'Medium', 2: 'Bad'}
    prediction_label = prediction_map.get(prediction, 'Unknown')

    projected_value = 10000 * (latest['Close'] / data.iloc[0]['Close'])

    recommendations = recommend_similar_stocks(stock_name)

    return jsonify({
        'stock': stock_name,
        'period': period,
        'latest_price': round(latest['Close'], 2),
        'risk_category': risk_category,
        'trust_score': trust_score,
        'prediction': prediction_label,
        'projected_returns': round(projected_value, 2),
        'recommendations': recommendations
    })

if __name__ == '__main__':
    app.run(debug=True)
