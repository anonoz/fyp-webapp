class SVMClassifier < SentimentClassifier
  CLASSIFIER_TYPE = 'svm'
  base_uri ENV['SVM_URL'] || 'http://localhost:6002'
end
