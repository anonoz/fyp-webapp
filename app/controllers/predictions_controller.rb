class PredictionsController < ApplicationController
  def create
    ['genji', 'hanzo'].each do |classifier_name|
      SentimentPredictionJob.perform_later({
        classifier: classifier_name,
        review_text: params[:review],
        user_id: current_user_id
      })
    end
  end
end
