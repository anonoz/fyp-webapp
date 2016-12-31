class ApplicationController < ActionController::Base
  before_action :set_temp_user_id

  protected

  def current_user_id
    set_temp_user_id
  end

  private

  def set_temp_user_id
    cookies.signed[:temp_user_id] ||= SecureRandom.hex[0..5]
  end
end
