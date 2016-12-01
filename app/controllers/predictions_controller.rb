class PredictionsController < ApplicationController
  def create
    results = {}
    results["genji"] = Genji.predict(params[:review])
    results["hanzo"] = Hanzo.predict(params[:review])
    render json: results
  end
end
