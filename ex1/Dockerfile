FROM ubuntu:20.04
RUN apt update
RUN apt-get -y install nodejs
WORKDIR /
COPY . /
EXPOSE 8000
CMD node json.js
