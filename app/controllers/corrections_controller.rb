class CorrectionsController < ApplicationController
  def create
    SentimentQuery.find(params[:query_id]).update(ground_truth: params[:ground_truth])
  end
end
