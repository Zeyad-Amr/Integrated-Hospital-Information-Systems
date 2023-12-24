from flask import Flask, request, make_response, jsonify
from werkzeug.utils import secure_filename
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import cv2
import os 

from pytesseract import image_to_string


app = Flask(__name__)

UPLOAD_FOLDER = 'IDs'



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










ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class NationalID:

    def __init__(self):
        self.model = load_model('model.h5')
        os.environ['TESSDATA_PREFIX'] = '.'
    

    def extract_name(self, front):
        try:
            firstName = ""
            lastName = ""
            nameImg = front[100:220, 250:630]
            cv2.imwrite("name.jpeg", nameImg)
            preprocessedName = self.preprocess(nameImg,3)
            name = image_to_string(preprocessedName,lang="ara", config=os.environ['TESSDATA_PREFIX'])
            if name is None or name.strip() == "":
                return "","","failed to detect name"
            else:
                parts = name.split('\n', 2)
                firstName = parts[0]
                lastName = parts[1]
            return firstName, lastName,""       
        
        except Exception as e:
            print(e)
            raise ValueError("failed to detect name")
    def extract_id(self, front, back):
        try:             
            frontId = front[330:365, 280:640]
            backId = back[28:58, 300:525]

            preprocessedFront = self.preprocess(frontId,4)
            preprocessedBack = self.preprocess(backId,4)
            frontNationalId = self.detectID(preprocessedFront)
            backNationalId = self.detectID(preprocessedBack)
            
            if len(frontNationalId) != 14 or len(backNationalId) != 14:
                return "","failed to detect national id"
            
            if frontNationalId != backNationalId:
                return frontNationalId, "check national id"
            
            return frontNationalId,""      
        
        except Exception as e:
            raise ValueError("failed to detect national id")


    def preprocess(self,img,scaleFator):

        resizedImage = cv2.resize(img, (0, 0), fx=scaleFator, fy=scaleFator)

        grayImage = cv2.cvtColor(resizedImage, cv2.COLOR_BGR2GRAY)

        median_filtered = cv2.medianBlur(grayImage, 5) 

        _, binary_otsu = cv2.threshold(median_filtered, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        binary_inverse = cv2.bitwise_not(binary_otsu)

        kernel = np.ones((3, 3), np.uint8)
        binary_morph = cv2.morphologyEx(binary_inverse, cv2.MORPH_CLOSE, kernel)

        line_dilation = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 5))  
        binary_dilated = cv2.dilate(binary_morph, line_dilation, iterations=1)

        line_erosion = cv2.getStructuringElement(cv2.MORPH_RECT, (1, 5)) 
        binary_eroded = cv2.erode(binary_dilated, line_erosion, iterations=1)
        return binary_eroded
    

    def detectID(self, img):
        contours, _ = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        contours = sorted(contours, key=lambda x: cv2.boundingRect(x)[0])

        nationalId = ""

        for contour in contours:
            if cv2.contourArea(contour) < 200:
                continue
            
            x, y, w, h = cv2.boundingRect(contour)
            number_roi = img[y:y + h, x:x + w]


            resized_img = cv2.resize(number_roi, (64, 64))

            resized_img_rgb = cv2.cvtColor(resized_img, cv2.COLOR_BGR2RGB)
            img_array = image.img_to_array(resized_img_rgb)
            img_array = np.expand_dims(img_array, axis=0)
            img_array /= 255.0  
            predictions = self.model.predict(img_array)

            predicted_class = np.argmax(predictions)
            
            nationalId += str(predicted_class)

        return nationalId










if __name__ == '__main__':
    os.makedirs(f'./{UPLOAD_FOLDER}',exist_ok=True)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    nationalIdObj = NationalID()
    app.run(debug=True)
