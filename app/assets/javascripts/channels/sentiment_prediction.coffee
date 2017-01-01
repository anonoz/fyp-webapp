App.sentiment_prediction = App.cable.subscriptions.create "SentimentPredictionChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server
    alert("Your WebSocket connection is gone. Try to reload the page.")

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    if data.status is 'ok'
      update_sentiment_result_box(data.classifier, data.results.polarity)
    else
      update_sentiment_result_box(data.classifier, 'offline')
