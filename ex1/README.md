# [Exercise 1] Simple backend into Docker

## Getting Started
Firstly, clone the project and open `ex1` directory in terminal
```bash
cd ex1
```
Secondly, build docker image

```bash
docker build -t {image-name} .
```
Finally, run docker container
```bash
docker run -dp 3000:8000 {image-name}
```

Once it has started, you can open your browser to [http://localhost:3000](http://localhost:3000).

## Docker compose

This project has a `docker-compose.yml` file, which will start the mkdocs application on your
local machine and help you see changes instantly.

```bash
docker compose up -d
```
