const express = require("express");
const cloudinary = require("../utils/cloudinary");
const { Readable } = require("stream");
const multer = require("multer");
const { registerUser, loginUser, getUserInfo } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/login", loginUser);
router.get("/getUser", protect, getUserInfo);


router.post("/register", upload.single("profilePic"), async (req, res) => {
  try {
    let profileImageUrl = "";
    if (req.file) {
      const bufferStream = new Readable();
      bufferStream.push(req.file.buffer);
      bufferStream.push(null);

      const result = await new Promise((resolve, reject) => {
        const cloudStream = cloudinary.uploader.upload_stream(
          { folder: "profile_pics" },
          (error, result) => (error ? reject(error) : resolve(result))
        );
        bufferStream.pipe(cloudStream);
      });

      profileImageUrl = result.secure_url;
    }
    req.body.profileImageUrl = profileImageUrl;
    await registerUser(req, res);
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    res.status(500).json({ success: false, message: "Signup failed" });
  }
});


module.exports = router;
