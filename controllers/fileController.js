const File = require("../models/File"); // Assuming the file model is in models/File.js

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

exports.uploadFile = upload.single("pdf_file");

exports.uploadFileToDB = async (req, res) => {
  console.log(
    "Upload File API request received :",
    req.body.semester,
    req.body.subject,
    req.body.chapter,
    req.file
  );
  try {
    // Assuming req.file contains the uploaded file details
    const { semester, subject, chapter } = req.body;
    const { originalname } = req.file;

    // Save file details to database
    await File.create({ semester, subject, chapter, filename: originalname });

    console.log("File uploaded successfully");
    res.status(200).json({ message: "File uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ message: "Failed to upload file" });
  }
};

exports.downloadFile = async (req, res) => {
  const { semester, subject, chapter } = req.query;
  try {
    const file = await File.findOne({ semester, subject, chapter });
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.download(`./uploads/${file.filename}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
