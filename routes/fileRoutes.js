const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

router.post(
  "/upload",
  fileController.uploadFile,
  fileController.uploadFileToDB
);

router.get("/download", fileController.downloadFile);

module.exports = router;
