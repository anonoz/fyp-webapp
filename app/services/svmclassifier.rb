class SVMClassifier < SentimentClassifier
  base_uri ENV['SVM_URL'] || 'http://localhost:5015'
end
