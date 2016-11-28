class SentimentClassifier
  include HTTParty

  def self.predict(review)
    begin
      response = self.post('/predict', {body: {review: review}.to_json})
      return response.parsed_response
    rescue Errno::ECONNREFUSED
      raise OfflineError, self.name
    end
  end

  class OfflineError < StandardError
    def initialize(classifier_name="SentimentClassifier")
      super("#{classifier_name} is offline.")
    end
  end
end
