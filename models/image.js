
const mongoose = require('mongoose');

// Define the schema for your image documents
const imageSchema = new mongoose.Schema({
  data: Buffer,         // Binary data of the image
  contentType: String,  // Content type of the image (e.g., 'image/png')
});

// Create the Image model using the schema
const Image = mongoose.model('Image', imageSchema);

// Export the model to use in other parts of your application
module.exports = Image;
