FROM ruby:2.6.3
RUN mkdir -p /app
WORKDIR /app
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs libgmp3-dev

ENV RAILS_ENV production

COPY Gemfile Gemfile.lock ./
RUN gem install bundler
RUN bundle install -j 4 --without development test

COPY . /app
RUN bundle exec rails assets:precompile

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
