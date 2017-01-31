class RFClassifier < SentimentClassifier
  base_uri ENV['RF_URL'] || 'http://localhost:5016'
end
