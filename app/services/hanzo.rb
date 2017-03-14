class Hanzo < SentimentClassifier
  CLASSIFIER_TYPE = 'cnn'
  base_uri ENV['HANZO_URL'] || 'http://localhost:6001'
end
