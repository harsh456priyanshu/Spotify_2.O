const express = require('express');
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/authMiddleware');
const { uploadSong } = require('../controllers/songController');

const router = express.Router();
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

router.post('/upload', verifyToken, upload.fields([
  { name: 'audio', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]), uploadSong);

module.exports = router;