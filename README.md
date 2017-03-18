# [FYP] Demo Web App

![Web App Screenshot](readme_img/sentiment-analysis-demo.gif)

## What Does This Do

The final objective of my final year project - Sentiment Analysis with Deep Learning is to build a web app so that people can test drive various sentiment classifiers with ease.

Athena will provide a simple interface for the user to enter or copy-paste movie reviews in, she will then request different sentiment classifier microservices, such as Genji (convolutional neural network with pre-trained word2vec), or Hanzo (convnet with self-trained word2vec), compile them and show it to the users. The user can choose to tell the system the correct sentiment polarity, that will allow researchers to look at the results and corrections.

I am in the midst of dockerizing this. The classifier microservices can be found at <https://github.com/anonoz/fyp-microservices>.
