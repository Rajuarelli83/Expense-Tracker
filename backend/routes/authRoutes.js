const express = require("express");
const multer = require("multer");
const cloudinary = require("../utils/cloudinary");
const fs = require("fs");

const {protect} = require("../middleware/authMiddleware");
const upload =require("../middleware/uploadMiddleware");

const {
  registerUser,
  loginUser,
  getUserInfo,
  updateProfileImage,
} = require("../controllers/authController");


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/getUser",protect,getUserInfo);  

router.post("/upload-image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profile_pics", 
    });
  
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      imageUrl: result.secure_url, 
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
});

router.put("/update-profile-image", protect, updateProfileImage);

module.exports = router;