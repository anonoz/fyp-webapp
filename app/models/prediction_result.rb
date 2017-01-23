class PredictionResult < ApplicationRecord
  belongs_to :sentiment_query
  
  enum classifier: {
    genji:          1,
    hanzo:          2,
    ffnn:           3,
    svmclassifier:  4,
    random_forests: 5,
    rnn:            6,
    lstmclassifier: 7,
    gruclassifier:  8
  }
end
