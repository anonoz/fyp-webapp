class SentimentClassifier
  include HTTParty
  
  def self.predict(review)
    begin
      response = self.post('/predict', {body: {review: review}.to_json})
      if response.code == 200
        return response.parsed_response
      elsif response.code == 502
        raise OfflineError, self.name
      else
        raise RuntimeError
      end
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
