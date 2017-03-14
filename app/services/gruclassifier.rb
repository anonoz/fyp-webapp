class GRUClassifier < SentimentClassifier
  CLASSIFIER_TYPE = 'gru'
  base_uri ENV['GRU_URL'] || 'http://localhost:6001'
end
