class PredictionResult < ApplicationRecord
  enum classifier: {
    genji:          1,
    hanzo:          2,
    ffnn:           3,
    svm:            4,
    random_forests: 5,
    rnn:            6,
    lstmclassifier: 7,
    gruclassifier:  8
  }
end
