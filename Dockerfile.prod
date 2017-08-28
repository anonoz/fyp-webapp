FROM ruby:2.4.1
MAINTAINER Anonoz <honsiongchs@gmail.com>
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libgmp3-dev
RUN mkdir /athena
WORKDIR /athena
ADD Gemfile /athena/Gemfile
ADD Gemfile.lock /athena/Gemfile.lock
RUN gem install bundler
RUN bundle install -j 8
ADD . /athena
