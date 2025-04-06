# Update to model.py to include Risk Factor Calculation and Stock Recommendation
import pandas as pd
import yfinance as yf
import numpy as np
import joblib
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler, LabelEncoder
from sklearn.metrics.pairwise import cosine_similarity

# List of top stocks for training
stocks = [
    "AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "NVDA", "META", "BRK-B", "JPM", "JNJ",
    "V", "PG", "UNH", "XOM", "HD", "MA", "ABBV", "PFE", "KO", "PEP",
    "COST", "MRK", "DIS", "WMT", "CVX", "BAC", "TMO", "LLY", "AVGO", "MCD",
    "NFLX", "AMD", "INTC", "CMCSA", "ADBE", "CSCO", "HON", "TXN", "IBM", "GS",
    "PYPL", "SBUX", "ISRG", "C", "GE", "BLK", "AXP", "CAT", "BA", "MDT",
    "DE", "LMT", "MMM", "GILD", "LOW", "T", "F", "GM", "NKE", "VRTX",
    "SO", "D", "DUK", "SPGI", "NEE", "SCHW", "USB", "PLD", "RTX", "CI",
    "MO", "CB", "ADI", "TGT", "BDX", "ZTS", "SYK", "EOG", "NOW", "CME",
    "PNC", "EL", "ICE", "TFC", "AON", "FDX", "EW", "APD", "PSA", "CL",
    "ROP", "COF", "MAR", "DG", "KLAC", "IDXX", "ITW", "KMB", "ECL", "PH",
    "AIG", "HUM", "MNST", "TT", "ORLY", "SYY", "VFC", "TRV", "DLR", "OTIS",
    "PCAR", "CTAS", "HCA", "AMP", "PAYX", "WELL", "MSCI", "FIS", "STZ", "MTD",
    "MCHP", "FTNT", "CDW", "DOV", "AME", "XYL", "WST", "RMD", "BRO", "CHD"
]

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

# Extend fetch_stock_data to include Risk Calculation
def fetch_stock_data(stock_name):
    stock = yf.Ticker(stock_name)
    stock_data = stock.history(period="10y")
    if stock_data.empty:
        return None
    stock_data['SMA20'] = stock_data['Close'].rolling(window=20).mean()
    stock_data['SMA50'] = stock_data['Close'].rolling(window=50).mean()
    stock_data['Volatility'] = stock_data['Close'].pct_change().rolling(window=20).std()
    stock_data.dropna(inplace=True)

    risk_category, trust_score = calculate_risk(stock_data)
    return stock_data, risk_category, trust_score

# Update dataset collection
all_data = []
for stock in stocks:
    result = fetch_stock_data(stock)
    if result is not None:
        data, risk_category, trust_score = result
        for _, row in data.iterrows():
            all_data.append([stock, row['Close'], row['Volume'], row['SMA20'], row['SMA50'], row['Volatility'], risk_category, trust_score])

df = pd.DataFrame(all_data, columns=['Stock', 'Close', 'Volume', 'SMA20', 'SMA50', 'Volatility', 'Risk_Category', 'Trust_Score'])

# Labeling investment advice
conditions = [
    (df['SMA20'] > df['SMA50']) & (df['Volatility'] < 0.02),
    (abs(df['SMA20'] - df['SMA50']) < 1) & (df['Volatility'] < 0.05),
    (df['SMA20'] < df['SMA50']) | (df['Volatility'] >= 0.05)
]
labels = ['Good', 'Medium', 'Bad']
df['Investment_Advice'] = np.select(conditions, labels, default='Bad')

# Prepare for model training
X = df[['Close', 'Volume', 'SMA20', 'SMA50', 'Volatility']]
y = LabelEncoder().fit_transform(df['Investment_Advice'])
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "investment_model.pkl")
joblib.dump(scaler, "scaler.pkl")


print("Model training complete with Risk Factor Analysis.")

# ==================== STOCK RECOMMENDATION ======================

# Prepare stock-wise aggregated feature set for recommendations
stock_features = df.groupby("Stock")[["Close", "Volume", "SMA20", "SMA50", "Volatility"]].mean()
stock_features_scaled = scaler.transform(stock_features)

# Similarity matrix
similarity_matrix = cosine_similarity(stock_features_scaled)
similarity_df = pd.DataFrame(similarity_matrix, index=stock_features.index, columns=stock_features.index)

# Function to recommend similar stocks
def recommend_similar_stocks(stock_name, top_n=5):
    if stock_name not in similarity_df.index:
        return []
    similar_scores = similarity_df[stock_name].sort_values(ascending=False)
    recommended = similar_scores.drop(index=stock_name).head(top_n).index.tolist()
    joblib.dump(similarity_df, "similarity_matrix.pkl")
    return recommended

# Example usage
if __name__ == "__main__":
    input_stock = "AAPL"
    recommendations = recommend_similar_stocks(input_stock)
    print(f"Top {len(recommendations)} recommendations for {input_stock}: {recommendations}")
