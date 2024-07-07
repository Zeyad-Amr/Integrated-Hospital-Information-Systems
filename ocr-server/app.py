from flask import Flask, request, make_response, jsonify
from werkzeug.utils import secure_filename
from keras.models import load_model
from keras.preprocessing import image
import numpy as np
import cv2
import os
import difflib

import re

from pytesseract import image_to_string

app = Flask(__name__)

UPLOAD_FOLDER = 'IDs'

governates = [
    {"id": 1, "value": "الإسكندرية"},
    {"id": 2, "value": "أسوان"},
    {"id": 3, "value": "أسيوط"},
    {"id": 4, "value": "الأقصر"},
    {"id": 5, "value": "البحر الأحمر"},
    {"id": 6, "value": "البحيرة"},
    {"id": 7, "value": "بني سويف"},
    {"id": 8, "value": "بورسعيد"},
    {"id": 9, "value": "جنوب سيناء"},
    {"id": 10, "value": "الجيزة"},
    {"id": 11, "value": "الدقهلية"},
    {"id": 12, "value": "دمياط"},
    {"id": 13, "value": "سوهاج"},
    {"id": 14, "value": "السويس"},
    {"id": 15, "value": "الشرقية"},
    {"id": 16, "value": "شمال سيناء"},
    {"id": 17, "value": "الغربية"},
    {"id": 18, "value": "الفيوم"},
    {"id": 19, "value": "القاهرة"},
    {"id": 20, "value": "القليوبية"},
    {"id": 21, "value": "قنا"},
    {"id": 22, "value": "كفر الشيخ"},
    {"id": 23, "value": "مطروح"},
    {"id": 24, "value": "المنوفية"},
    {"id": 25, "value": "المنيا"},
]

@app.route('/extractdata', methods=['POST'])
def extract_id():

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
            front_path = os.path.join(
                app.config['UPLOAD_FOLDER'], front_filename)
            back_path = os.path.join(
                app.config['UPLOAD_FOLDER'], back_filename)

            front.save(front_path)
            back.save(back_path)
            frontImg = cv2.imread(front_path)
            backImg = cv2.imread(back_path)

            fName, lName, address = nationalIdObj.extract_name_and_address(frontImg)
            # trim leading and trailing whitespace from extracted text
            fName = fName.strip()
            lName = lName.strip()
            address = address.strip()

            governate = nationalIdObj.find_matching_governate(address, governates)
            # resize images
            frontImg = cv2.resize(frontImg, (654, 430))
            backImg = cv2.resize(backImg, (654, 430))


            nationalId, error = nationalIdObj.extract_id(frontImg, backImg)

            if error == "failed to detect national id":
                statusCode = 421
            elif error == "check national id":
                statusCode = 422

            idObj = {"nationalId": nationalId, "error": error}
            return make_response(jsonify({"f_name":fName, "l_name":lName, "national_id": idObj,
                                          "governate":governate, "address":address}), statusCode)

        return make_response(jsonify({"message": "Invalid file format"}), 400)



ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class NationalID:

    def __init__(self):
        self.model = load_model('model.h5')
        os.environ['TESSDATA_PREFIX'] = '.'

    def extract_name_and_address(self, raw_image):

        name_x, name_y, name_w, name_h = 340, 100, 500, 52  # Adjust these values as needed
        l_name_x, l_name_y, l_name_w, l_name_h = 280, 145, 550, 55  # Adjust these values as needed
        address_x, address_y, address_w, address_h = 250, 200, 480, 100  # Adjust these values as needed

        cv2.imwrite("./IDs/name_x.jpeg", raw_image[name_y:name_y+name_h, name_x:name_x+name_w])

        # Crop the images
        name_image = raw_image[name_y:name_y+name_h, name_x:name_x+name_w]
        l_name_image = raw_image[l_name_y:l_name_y+l_name_h, l_name_x:l_name_x+l_name_w]
        address_image = raw_image[address_y:address_y+address_h, address_x:address_x+address_w]

        cv2.imwrite("./IDs/name_image.jpeg", name_image)

        # Preprocess the images
        name_gray = cv2.cvtColor(name_image, cv2.COLOR_BGR2GRAY)
        l_name_gray = cv2.cvtColor(l_name_image, cv2.COLOR_BGR2GRAY)
        address_gray = cv2.cvtColor(address_image, cv2.COLOR_BGR2GRAY)

        cv2.imwrite("./IDs/name_gray.jpeg", name_gray)

        name_blurred = cv2.GaussianBlur(name_gray, (3, 3), 0)
        l_name_blurred = cv2.GaussianBlur(l_name_gray, (3, 3), 0)
        address_blurred = cv2.GaussianBlur(address_gray, (3, 3), 0)

        cv2.imwrite("./IDs/name_blurred.jpeg", name_blurred)

        _, name_threshed = cv2.threshold(name_blurred, 0, 255, cv2.THRESH_OTSU)
        _, address_threshed = cv2.threshold(address_blurred, 0, 255, cv2.THRESH_OTSU)
        _, l_name_threshed = cv2.threshold(l_name_blurred, 0, 255, cv2.THRESH_OTSU)

        cv2.imwrite("./IDs/name_threshed.jpeg", name_threshed)


        name_config = r'--oem 1 --psm 6 -c tessedit_char_whitelist="ءآأؤإئىئةابتثجحخدذرزسشصضطظعغفقكلمنهوي "'
        f_name_result = image_to_string(name_threshed, lang='ara', config=name_config)


        l_name_result = image_to_string(l_name_threshed, lang='ara', config=name_config)


        address_config = r'--oem 1 --psm 6 -c tessedit_char_whitelist="ءآأؤإئىئةابتثجحخدذرزسشصضطظعغفقكلمنهوي- "'
        address_result = image_to_string(address_threshed, lang='ara', config=address_config)

        return f_name_result, l_name_result, address_result
    def get_governate(self, address):
        # Trim leading and trailing whitespace
        trimmed_sentence = address.strip()
        
        # Split the sentence by spaces and hyphens
        words = [word for word in re.split(r'[\s-]+', trimmed_sentence) if word]
        
        # Get the last word
        if words:
            return words[-1]
        else:
            return ''
        
    def find_matching_governate(self, address, governates):
        governate = self.get_governate(address)
        # Clean the extracted text (remove extra spaces, normalize characters, etc.)
        cleaned_text = governate.strip()

        # Use difflib's get_close_matches to find the closest matches
        matches = difflib.get_close_matches(cleaned_text, [g["value"] for g in governates], n=1, cutoff=0.6)

        if matches:
            closest_match = matches[0]
            # Find the matching governate object
            matching_governate = next((g for g in governates if g["value"] == closest_match), None)
            return matching_governate
        else:
            return None
        
    def extract_id(self, front, back):
        try:
            frontId = front[330:365, 260:640]
            backId = back[28:58, 280:525]

            preprocessedFront = self.preprocess(frontId, 4)
            preprocessedBack = self.preprocess(backId, 4)
            cv2.imwrite("./IDs/frontPreprocessed.jpeg", preprocessedFront)
            cv2.imwrite("./IDs/backPreprocessed.jpeg", preprocessedBack)
            frontNationalId = self.detectID(preprocessedFront)
            backNationalId = self.detectID(preprocessedBack)
            # check length of national id
            if len(frontNationalId) != 14:
                return frontNationalId, "check national id"


            return frontNationalId, ""

        except Exception as e:
            raise ValueError("failed to detect national id")

    def preprocess(self, img, scaleFactor=1.0):
        print("images dimensions", img.shape)

          # Resize the image
        resizedImage = cv2.resize(img, (0, 0), fx=scaleFactor, fy=scaleFactor)

        # Convert the image to grayscale
        grayImage = cv2.cvtColor(resizedImage, cv2.COLOR_BGR2GRAY)

        # Apply median blur to reduce noise
        median_filtered = cv2.medianBlur(grayImage, 5)

        # Apply Otsu's thresholding to get a binary image
        _, binary_otsu = cv2.threshold(median_filtered, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)

        # Invert the binary image (optional, depending on text color)
        binary_inverse = cv2.bitwise_not(binary_otsu)

    



        return binary_inverse

    def detectID(self, img):
        contours, _ = cv2.findContours(
            img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
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


@app.route('/ping', methods=['GET'])
def ping():
    return make_response(jsonify({"message": "pong"}), 200)


if __name__ == '__main__':
    print("Starting server")
    os.makedirs(f'./{UPLOAD_FOLDER}', exist_ok=True)
    app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
    nationalIdObj = NationalID()
    app.run("0.0.0.0",debug=True)
