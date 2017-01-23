class PredictionsController < ApplicationController
  def create
    query = SentimentQuery.create(review_text: params[:review])
    
    SentimentClassifier::CLASSIFIERS.each do |classifier_name|
      SentimentPredictionJob.perform_later({
        classifier: classifier_name,
        query_id: query.id,
        user_id: current_user_id
      })
    end
  end
end
