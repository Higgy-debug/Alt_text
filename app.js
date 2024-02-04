const express = require('express');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const Image = require('./models/image'); // Assuming you have a model for Image
import('node-fetch').then((fetchModule) => {
  const fetch = fetchModule.default;
}).catch((error) => {
  console.error('Error importing node-fetch:', error);
});

const fs = require('fs');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.static('public'));
app.use(express.static('assets'));
app.use(fileUpload());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Function to query Hugging Face model for image captioning
async function queryHuggingFaceModel(fileBuffer) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base",
      {
        headers: { Authorization: `Bearer ${process.env.HUGGING_FACE_API_TOKEN}` },
        method: "POST",
        body: fileBuffer,
      }
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error querying Hugging Face model:', error);
    return null;
  }
}

app.post('/api/upload', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'Invalid file.' });
    }

    // Save the image to MongoDB using the Image model
    const savedImage = new Image({
      data: req.files.image.data,
      contentType: req.files.image.mimetype,
    });

    const uploadedImage = await savedImage.save();

    // Query Hugging Face model after saving the image
    const huggingFaceResult = await queryHuggingFaceModel(req.files.image.data);

    res.status(200).json({
      message: 'Image uploaded successfully',
      altText: huggingFaceResult, // Modify this based on the actual structure of the Hugging Face result
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error uploading image.' });
  }
});


const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
