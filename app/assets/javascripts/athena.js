var textbox, textbox_timeout, current_review_hash, curent_query_id, returned_count;
var classifiers = [];
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

  // Find classifiers
  for (slider_classifier of document.querySelectorAll('[data-slider-classifier]')) {
    classifiers.push(slider_classifier.getAttribute('data-slider-classifier'));
  }

  // Change the symbol to loading icon as soon as user types
  //
  // When user stops typing in the textarea for 400ms, 
  // then fire an AJAX request
  //
  textbox.oninput = function(e){
    var review_text = this.value;
    returned_count = 0;
    current_review_hash = md5(review_text).slice(0, 6);

    if (this.value == '') {
      for (var classifier_name of classifiers) {
        update_sentiment_result_box(classifier_name, 'nothing');
      }
      return;
    } else {
      for (var classifier_name of classifiers) {
        if (!document.querySelectorAll('[data-slider-classifier="' + classifier_name + '"] .sentiment-result')[0].className.match('sentiment-loading')) {
          update_sentiment_result_box(classifier_name, 'loading');
        }
      }
    }

    clearTimeout(textbox_timeout);
    textbox_timeout = setTimeout(function(){
      predict_sentiment(review_text, function(query) {
        current_query_id = query.id;
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

      // POST ground truth
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "/corrections", true);
      xhr.setRequestHeader("Content-type", "application/json");
      var request_body = JSON.stringify({
        query_id: current_query_id,
        ground_truth: this.getAttribute('data-ground-truth')
      });
      xhr.send(request_body);

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
      var query = JSON.parse(xhr.responseText);
      callback && callback(query);
    }
  }
  var request_body = JSON.stringify({"review": review});
  xhr.send(request_body);
  current_review_hash = md5(review).slice(0, 6);
}

function update_sentiment_result_box(classifier_name, polarity, review_hash) {
  if (classifier_name == null) {return;}
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

  if (polarity != 'loading' && polarity != 'nothing') {
    returned_count++;
  }

  // Show ground truth reporting box
  if (returned_count == classifiers.length) {
    document.
      getElementsByClassName('feedback-pending')[0].
      classList.remove('hidden');
    document.
      getElementsByClassName('feedback-given')[0].
      classList.add('hidden');
  } else {
    document.
      getElementsByClassName('feedback-pending')[0].
      classList.add('hidden');
    document.
      getElementsByClassName('feedback-given')[0].
      classList.add('hidden');
  }
}
