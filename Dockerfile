FROM ruby:2.4.1
MAINTAINER Anonoz <honsiongchs+github@gmail.com>
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libgmp3-dev
RUN mkdir /app
WORKDIR /app
ADD Gemfile /app/Gemfile
ADD Gemfile.lock /app/Gemfile.lock
RUN gem install bundler
RUN bundle install -j 8
# ADD . /athena
