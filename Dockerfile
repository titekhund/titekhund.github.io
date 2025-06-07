FROM jekyll/builder:latest
WORKDIR /srv/jekyll
COPY . .
RUN bundle install
EXPOSE 4000
CMD ["jekyll", "serve", "--host", "0.0.0.0"]
