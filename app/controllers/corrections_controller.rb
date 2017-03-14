class CorrectionsController < ApplicationController
  def index
    @queries = SentimentQuery.where("ground_truth IS NOT NULL").order("created_at DESC").includes(:prediction_results)
    render "predictions/index"
  end

  def create
    SentimentQuery.find(params[:query_id]).update(ground_truth: params[:ground_truth])
  end
end
