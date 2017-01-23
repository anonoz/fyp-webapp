class Genji < SentimentClassifier
  base_uri ENV['GENJI_URL'] || 'http://localhost:5011'
end
