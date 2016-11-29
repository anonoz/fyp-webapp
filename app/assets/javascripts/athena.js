var textbox, textbox_timeout;
var flip = true;
var imdb_movie_review_urls = [
  "http://www.imdb.com/title/tt1375666/reviews", // Inception
  "http://www.imdb.com/title/tt0114709/reviews", //Toystory
  "http://www.imdb.com/title/tt2788710/reviews", // The Interview
  "http://www.imdb.com/title/tt1398426/reviews", // Straight Outta Compton
];
var textbox_placeholder_movie_titles = [
  "Kung Fu Hustle", "Inception", "Titanic", "Avatar",
  "Star Wars VII: The Force Awakens", "Finding Nemo",
  "Toy Story", "The Internship", "Captain America: Civil War",
  "Batman v Superman: Dawn of Justice", "Saving Pvt Ryan"
]

window.onload = function(){
  // Hook up elements
  textbox = document.getElementById('movie-review-input');
  feedback_buttons = document.getElementsByClassName('feedback-button');
  random_review_link = document.getElementById('random-review-link');

  // Placeholder
  textbox.setAttribute('placeholder',
    'What do you think about the movie '+ 
    textbox_placeholder_movie_titles[Math.floor(Math.random()*textbox_placeholder_movie_titles.length)] +
    '?');

  // When user stops typing in the textarea for 400ms, 
  // then fire an AJAX
  textbox.oninput = function(e){
    if (this.value == '') {return;}
    clearTimeout(textbox_timeout);
    textbox_timeout = setTimeout(function(){

      // Do the sentiment card sliding
      var sentiment_result = document.createElement('div');
      sentiment_result.setAttribute("class", "sentiment-result sentiment-preload " + (flip ? "sentiment-positive":"sentiment-negative"));
      var sentiment_sliders = document.getElementsByClassName('sentiment-slider');
      
      for (var i in sentiment_sliders) {
        if (!sentiment_sliders.hasOwnProperty(i)) {break;}
        (function(){
          var slider_div = sentiment_sliders[i];
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

      flip = !flip;

      // Reset feedback box
      document.
        getElementsByClassName('feedback-given')[0].
        classList.add('hidden');
      document.
        getElementsByClassName('feedback-pending')[0].
        classList.remove('hidden');
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
    var url = imdb_movie_review_urls[Math.floor(Math.random()*imdb_movie_review_urls.length)];
    window.open(url);
    return false;
  }
};
