var textbox, textbox_timeout;
var imdb_movie_review_urls = [
  "https://www.rottentomatoes.com/m/fantastic_beasts_and_where_to_find_them/#contentReviews",
  "https://www.rottentomatoes.com/m/doctor_strange_2016#contentReviews",
  "https://www.rottentomatoes.com/m/matrix#contentReviews",
  "https://www.rottentomatoes.com/m/kubo_and_the_two_strings_2016#contentReviews",
  "https://www.rottentomatoes.com/tv/mr_robot/s01/#contentReviews",
  "https://www.rottentomatoes.com/m/suicide_squad_2016#contentReviews",
  "https://www.rottentomatoes.com/m/finding_dory#contentReviews",
  "https://www.rottentomatoes.com/m/gone_girl#contentReviews",
  "https://www.rottentomatoes.com/m/phantom_of_the_opera#contentReviews",
  "https://www.rottentomatoes.com/m/nerve_2016#contentReviews",
  "https://www.rottentomatoes.com/m/the_hunger_games_catching_fire#contentReviews",
  "https://www.rottentomatoes.com/m/john_wick#contentReviews"
];
var textbox_placeholder_movie_titles = [
  "Kung Fu Hustle", "Inception", "Titanic", "Avatar",
  "Star Wars VII: The Force Awakens", "Finding Nemo",
  "Toy Story", "The Internship", "Captain America: Civil War",
  "Batman v Superman: Dawn of Justice", "Saving Private Ryan"
]

window.onload = function(){
  // Hook up elements
  textbox = document.getElementById('movie-review-input');
  feedback_buttons = document.getElementsByClassName('feedback-button');
  random_review_link = document.getElementById('random-review-link');

  // Placeholder
  textbox.setAttribute('placeholder', 'Type a movie review here, or click the link below the textbox to copy & paste');

  // Change the symbol to loading icon as soon as user types
  //
  // When user stops typing in the textarea for 400ms, 
  // then fire an AJAX request
  //
  textbox.oninput = function(e){
    if (this.value == '') {
      for (var classifier_name of ['genji', 'hanzo', 'lstmclassifier']) {
        update_sentiment_result_box(classifier_name, 'nothing', false);
      }
      return;
    } else {
      for (var classifier_name of ['genji', 'hanzo', 'lstmclassifier']) {
        if (!document.querySelectorAll('[data-slider-classifier="' + classifier_name + '"] .sentiment-result')[0].className.match('sentiment-loading')) {
          update_sentiment_result_box(classifier_name, 'loading', false);
        }
      }
    }

    var review_text = this.value;
    clearTimeout(textbox_timeout);
    textbox_timeout = setTimeout(function(){
      predict_sentiment(review_text, function(sentiments){
        for (var classifier_name in sentiments) {
          if (sentiments.hasOwnProperty(classifier_name)) {
            update_sentiment_result_box(classifier_name, sentiments[classifier_name].polarity);
          }
        }
      });
    }, 600);
  };

  // Feedback button 'good' or 'bad'
  for (var i in feedback_buttons) {if (feedback_buttons.hasOwnProperty(i)) {
    feedback_buttons[i].onclick = function(e) {
      document.
        getElementsByClassName('feedback-pending')[0].
        classList.add('hidden');
      document.
        getElementsByClassName('feedback-given')[0].
        classList.remove('hidden');
      return false;
    }
  }}

  // Gimme random movie reviews
  random_review_link.onclick = function(e){
    var url = imdb_movie_review_urls[Math.floor(Math.random() * imdb_movie_review_urls.length)];
    window.open(url);
    return false;
  }
};

function predict_sentiment(review, callback){
  var xhr = new XMLHttpRequest();
  var url = "/predict";
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json");
  xhr.onreadystatechange = function(){
    if (xhr.readyState == 4 && xhr.status == 200) {
      var sentiments = JSON.parse(xhr.responseText);
      callback && callback(sentiments);
    }
  }
  var request_body = JSON.stringify({"review": review});
  xhr.send(request_body);
}

function update_sentiment_result_box(classifier_name, polarity, is_offline) {
  // Do the sentiment card sliding
  var sentiment_result = document.createElement('div');
  sentiment_result.setAttribute("class", "sentiment-result sentiment-preload sentiment-" + polarity);
  var sentiment_slider = document.querySelectorAll('[data-slider-classifier="' + classifier_name + '"]')[0];

  (function(){
    var slider_div = sentiment_slider;
    var old_sentiment = slider_div.getElementsByClassName('sentiment-current')[0];
    var new_sentiment = sentiment_result.cloneNode(true);

    // Delete .sentiment-exit after it exits from viewport
    old_sentiment.addEventListener('transitionend', function(e){
      this.parentNode.removeChild(this);
    });

    // Prepend .sentiment-preload
    slider_div.insertBefore(new_sentiment, old_sentiment);

    setTimeout(function(){ 
      new_sentiment.classList.remove('sentiment-preload');
      new_sentiment.classList.add('sentiment-current');
    }, 16);

    // Change .current to .exit and .preload to .current
    if (old_sentiment.classList.contains('sentiment-current')) {
      old_sentiment.classList.remove('sentiment-current');
      old_sentiment.classList.add('sentiment-exit');
    }
  })();
}
