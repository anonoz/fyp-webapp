# Be sure to restart your server when you modify this file. Action Cable runs in a loop that does not support auto reloading.
class SentimentPredictionChannel < ApplicationCable::Channel
  def subscribed
    stream_from "sentiment_prediction_for_#{ temp_user_id }"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
