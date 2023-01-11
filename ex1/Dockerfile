FROM ubuntu:20.04
RUN apt update
RUN apt-get -y install nodejs
RUN mkdir /app/
WORKDIR /app/
COPY . /app/
EXPOSE 8000
CMD node json.js
