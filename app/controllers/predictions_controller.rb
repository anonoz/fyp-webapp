class PredictionsController < ApplicationController
  def index
    @queries = SentimentQuery.order("created_at DESC").includes(:prediction_results)
  end

  def create
    query = SentimentQuery.create(review_text: params[:review])
    review_text_hash = Digest::MD5.hexdigest(query.review_text)[0..5]

    render json: query
    
    SentimentClassifier::CLASSIFIERS.each do |classifier_name|
      SentimentPredictionJob.perform_later({
        classifier: classifier_name,
        query_id: query.id,
        user_id: current_user_id
      })
    end
  end
end
