class HealthcheckController < ActionController::Base
  def index
    head :ok
  end
end
