class RFClassifier < SentimentClassifier
  CLASSIFIER_TYPE = 'rf'
  base_uri ENV['RF_URL'] || 'http://localhost:6002'
end
