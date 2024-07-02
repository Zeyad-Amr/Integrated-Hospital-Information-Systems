// src/scanner/scanner.service.ts
import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as fs from 'fs';
import * as util from 'util';
import * as path from 'path';
import * as Jimp from 'jimp';
import axios from 'axios';
import * as FormData from 'form-data';


const readFile = util.promisify(fs.readFile);

@Injectable()
export class ScanerService {
  private scannedImages: Buffer[] = [];

  async scanDocument(): Promise<string> {
    return new Promise((resolve, reject) => {
      // Define the output path for the scanned image
      const outputPath = path.join(
        process.cwd(),
        'image.jpeg',
      );
      const scriptPath = path.join(
        process.cwd(),
        'src',
        'scan',
        'scripts',
        'scan.ps1',
      );

      exec(`powershell -ExecutionPolicy Bypass -File "${scriptPath}" -outputPath "${outputPath}"`,async (error, stdout, stderr) => {
          if (error) {
            return reject(stderr);
          }

          try {
            let imageBuffer = await readFile(outputPath);

            // Define the path for the cropped image
            const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
            const uploadPath = path.join(process.cwd(), 'uploads');
            if (!fs.existsSync(uploadPath)) {
              fs.mkdirSync(uploadPath, { recursive: true });
            }
            const croppedImagePath = path.join(uploadPath, 'cropped_image'+uniqueSuffix +'.jpeg');
  
            // Crop the image using Jimp
            const image = await Jimp.read(imageBuffer)
            const croppedImage = image.crop(0, 0, 430, 680) // Adjust the crop dimensions as needed
            

          // Rotate the image 90 degrees clockwise
          croppedImage.rotate(-90);

            // Save the cropped image to a file
            await croppedImage.writeAsync(croppedImagePath)
  
            // Get the buffer of the cropped image
            const croppedImageBuffer = await croppedImage.getBufferAsync(Jimp.MIME_JPEG);
  
            // Store the cropped image in memory
            this.scannedImages.push(croppedImageBuffer);
            // Optionally delete the file after reading it into memory
              fs.unlinkSync(outputPath);

            resolve('Scan complete and image stored in memory');
          } catch (err) {
            console.log(err);

            reject(`Failed to read the scanned image: ${err.message}`);
          }
        },
      );
    });
  }

  async sendImagesToExternalApi() {
    const apiUrl = 'http://localhost:5000/extractdata'// Replace with your actual API URL
    const form = new FormData();

    this.scannedImages.forEach((image, index) => {
      if (index === 0) {
        form.append('front', image, { filename: 'front.jpeg' });
      } else if (index === 1) {
        form.append('back', image, { filename: 'back.jpeg' });
      }
    });
 
    try {
      const response = await axios.post(apiUrl, form, {
        headers: {
          ...form.getHeaders(),
        },
      });

      // if (![200, 201].includes(response.status)) {
      //   throw new Error('Failed to send images to the external API');
      // }
      

      console.log('Images sent to external API successfully');
      // Optionally clear the stored images after sending
      this.scannedImages = [];
      return response.data
    } catch (error) {
      this.scannedImages = [];
      // console.error('Error sending images to external API:', error);
      throw error;
    }
  }
}
