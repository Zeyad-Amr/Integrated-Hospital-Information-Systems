FROM python:3.10.12

WORKDIR /app

RUN apt-get update && apt-get install -y libgl1
RUN apt-get update && apt-get install -y tesseract-ocr

COPY . /app

RUN pip install -r requirements.txt
RUN pip install tensorflow

EXPOSE 5000

CMD ["python3", "app.py"]
