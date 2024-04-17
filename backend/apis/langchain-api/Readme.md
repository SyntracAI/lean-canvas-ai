# Langchain api

## Installation

``` sh
source ./.venv/bin/activate
pip install -r requirements.txt
```

## Start server

``` sh
uvicorn app.main:app --reload --port 8082
```

## Build docker

``` sh
docker build -t langchain-api .
```


## Run docker
``` sh
docker run -d --name langchain-api -p 8082:80 langchain-api
```

## Deployment instructions

> **Requirements**: Docker. In order to build images locally and push them to ECR, you need to have Docker installed on your local machine. Please refer to [official documentation](https://docs.docker.com/get-docker/).

In order to deploy your service, run the following command

```
sls deploy
```
