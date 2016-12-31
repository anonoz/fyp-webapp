class SentimentPredictionJob < ApplicationJob
  queue_as :default

  def perform(user_id:, classifier:, review_text:)
    begin
      results = classifier.capitalize.constantize.predict(review_text)
      review_text_hash = Digest::MD5.hexdigest(review_text)[0..5]
      ActionCable.server.broadcast("sentiment_prediction_for_#{ user_id }", {
        classifier: classifier,
        status: :ok,
        review_text_hash: review_text_hash,
        results: results
      })
    rescue SentimentClassifier::OfflineError => offline_error
      ActionCable.server.broadcast("sentiment_prediction_for_#{ user_id }", {
        classifier: classifier,
        status: :offline
      })
    end
  end
end
