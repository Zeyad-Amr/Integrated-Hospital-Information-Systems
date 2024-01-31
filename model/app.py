from flask import Flask, request, make_response, jsonify
from werkzeug.utils import secure_filename

import cv2
import os 
from helpers.utils import NationalID, allowed_file
from flask_cors import CORS


app = Flask(__name__)

CORS(app)
UPLOAD_FOLDER = 'IDs'


@app.route('/ping', methods=['GET'])
def index():
    return "Hello World!"

@app.route('/extractdata', methods=['POST'])
def extract_id():

    try:
        if 'front' not in request.files or 'back' not in request.files:
            return make_response(jsonify({"message": "Some data is missing in the request"}), 400)

        front = request.files['front']
        back = request.files['back']

        if front.filename == '' or back.filename == '':
            return make_response(jsonify({"message": "One or more files are empty"}), 400)

        if front and allowed_file(front.filename) and back and allowed_file(back.filename):
            statusCode = 200
            front_filename = secure_filename("front.jpeg")
            back_filename = secure_filename("back.jpeg")
            front_path = os.path.join(app.config['UPLOAD_FOLDER'], front_filename)
            back_path = os.path.join(app.config['UPLOAD_FOLDER'], back_filename)

            front.save(front_path)
            back.save(back_path)
            frontImg = cv2.imread(front_path)
            backImg = cv2.imread(back_path)

            firstName, lastName, error = nationalIdObj.extract_name(frontImg)
            nameObj = {"firstName": firstName, "lastName": lastName, "error": error}
            
            if error != "":
                statusCode = 420
            
            nationalId, error = nationalIdObj.extract_id(frontImg, backImg)
            
            if error == "failed to detect national id":
                statusCode = 421
            elif error == "check national id":
                statusCode = 422

            idObj = {"nationalId": nationalId, "error": error}
            return make_response(jsonify({"name": nameObj, "nationalId": idObj}), statusCode)            

        return make_response(jsonify({"message": "Invalid file format"}), 400)

    except Exception as e:
        print(e)
        return make_response({"message":"internal server error"}, 500)



if __name__ == '__main__':
    os.makedirs(f'./{UPLOAD_FOLDER}',exist_ok=True)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    nationalIdObj = NationalID()
    app.run(host='0.0.0.0', debug=True)

