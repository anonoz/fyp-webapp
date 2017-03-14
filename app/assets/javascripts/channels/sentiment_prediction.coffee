App.sentiment_prediction = App.cable.subscriptions.create "SentimentPredictionChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    if data.status == 'ok'
      if data.review_text_hash == current_review_hash
        update_sentiment_result_box(data.classifier, data.results.polarity, current_review_hash)
    else
      update_sentiment_result_box(data.classifier, 'offline')
