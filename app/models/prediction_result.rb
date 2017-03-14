class PredictionResult < ApplicationRecord
  belongs_to :sentiment_query
  
  enum classifier_id: {
    genji:          1, # 5011
    hanzo:          2, # 5012
    ffnnclassifier: 3, # 5014
    svmclassifier:  4, # 5015
    rfclassifier:   5, # 5016
    rnn:            6, # unassigned
    lstmclassifier: 7, # 5013
    gruclassifier:  8  # 5017
  }
end
