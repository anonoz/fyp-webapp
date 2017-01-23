class LSTMClassifier < SentimentClassifier
  base_uri ENV['LSTM_URL'] || 'http://localhost:5013'
end
