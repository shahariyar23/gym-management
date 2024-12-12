const cloudinary = require("cloudinary").v2;
const multer = require("multer");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUD_NAME,
  api_key: process.env.REACT_APP_API_KEY,
  api_secret:  process.env.REACT_APP_API_SECRET
});

// Use multer memory storage to store files in memory as buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

const imageUploaderUtils = async (file) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return result;
};

// Export functions using module.exports
module.exports = { imageUploaderUtils, upload };
