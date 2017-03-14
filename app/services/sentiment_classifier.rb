class SentimentClassifier
  include HTTParty

  CLASSIFIERS = ['lstmclassifier', 'gruclassifier', 'genji', 'hanzo', 'ffnnclassifier', 'svmclassifier', 'rfclassifier']
  
  def self.predict(review)
    begin
      request_body = {
        classifier: self::CLASSIFIER_TYPE,
        review: review
      }.to_json
      response = self.post('/predict', {body: request_body})
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
