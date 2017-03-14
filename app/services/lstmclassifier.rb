class LSTMClassifier < SentimentClassifier
  CLASSIFIER_TYPE = 'lstm'
  base_uri ENV['LSTM_URL'] || 'http://localhost:6001'
end
