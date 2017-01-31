class FFNNClassifier < SentimentClassifier
  base_uri ENV['FFNN_URL'] || 'http://localhost:5014'
end
