class Hanzo < SentimentClassifier
  base_uri ENV['HANZO_URL'] || 'http://localhost:5012'
end
