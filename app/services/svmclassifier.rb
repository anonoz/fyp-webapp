class SVMClassifier < SentimentClassifier
  base_url ENV['SVM_URL'] || 'http://localhost:5015'
end
