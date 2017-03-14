class Genji < SentimentClassifier
  CLASSIFIER_TYPE = 'cnn'
  base_uri ENV['GENJI_URL'] || 'http://localhost:5011'
end
