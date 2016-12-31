class PredictionsController < ApplicationController
  def create
    SentimentPredictionJob.perform_later({
      classifier: 'genji',
      review_text: params[:review],
      user_id: current_user_id
    })
  end
end
