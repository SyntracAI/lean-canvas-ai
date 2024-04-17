FROM public.ecr.aws/lambda/python:3.11

ARG stage

COPY ./requirements.txt ./requirements.txt

RUN pip install --no-cache-dir --upgrade -r ./requirements.txt

COPY ./app ./app
COPY ./main.py ./
COPY ./.env.${stage} ./.env

CMD ["main.handler"]
