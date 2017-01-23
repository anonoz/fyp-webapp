class SentimentPredictionJob < ApplicationJob
  queue_as :default

  def perform(user_id:, classifier:, query_id:)
    begin
      query = SentimentQuery.find(query_id)
      review_text_hash = Digest::MD5.hexdigest(query.review_text)[0..5]
      results = classifier.camelize.constantize.predict(query.review_text)

      PredictionResult.create({
        sentiment_query_id: query_id,
        classifier_id: classifier,
        polarity: (results['polarity'] == 'positive' ? 1 : -1),
        confidence: results['score'].max
      })
      
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
