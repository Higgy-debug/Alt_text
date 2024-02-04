# Alt Text Generator

This Alt-Text-Generator application uses Hugging-Face and 
Salesforce/blip-image-captioning-base to analyse an image and provide you with a caption to use as alt text!

## Depedencies
* Node.js >= 16.14.0
* "dotenv": "^16.4.1"
* "express": "^4.18.2"
* "express-fileupload": "^1.4.1"
* "mongodb": "^6.3.0"              
* "multer": "^1.4.5-lts.1"    (It is used to handle multiform data specfically for uploading files)
* "node-fetch": "^3.2.6"
* "replicate": "^0.25.2"   (Optional if u want to use Replicate-AI API)

## Installation from source

Follow these steps to get the project up and running on your own machine.

1. Clone the repository:
   git clone 
   
2. Install project dependencie using:
   npm install

3. Set up your environment variables:
   To configure the project, create a **.env** file in the project root and add the following variables:

   * PORT=5500
   * MONGODB_URI=mongodb+srv://hirthick10nitt:Hirthickkesh2001@cluster1.n3y7seo.mongodb.net/?retryWrites=true&w=majority
   * REPLICATE_API_TOKEN=r8_Zf8yoRuW6vUNx1daUSta0VgL3DPxjcm05fZ4T (Optional)
   * HUGGING_FACE_API_TOKEN = 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
   
5. Run the Project
  To start the project:
    * node app.js

- The application will be available at http://localhost:5500 (hosting locally).

## Usage
- Upload an image using the provided interface.
- Click the "Generate Alt Texts" button.
- The AI will analyze the image and provide an alt text description along with the Image Upload Successfull message(POST request to 'api/upload')
- To get the binary form of data, meta data, Image ID (POST request to 'api/uploaded-photos')


