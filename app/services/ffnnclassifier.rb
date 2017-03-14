class FFNNClassifier < SentimentClassifier
  CLASSIFIER_TYPE = 'ffnn'
  base_uri ENV['FFNN_URL'] || 'http://localhost:6002'
end
