FROM python:3.10.12

WORKDIR /app

COPY . /app

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

RUN pip install -r requirements.txt
RUN pip install tensorflow


EXPOSE 5000

CMD ["flask", "run"]
