const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
require("dotenv").config();

const url = process.env.MONGO_DB_URL;

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
        filename: `${Date.now()}_${file.originalname}`,
      };
    } else {
      return `${Date.now()}_${file.originalname}`;
    }
  },
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

const app = express();

// Upload your files as usual
app.post("/upload/image", upload.single("avatar"), (req, res, next) => {
  /*....*/
  const file = req.file;
  console.log({ file });
  res.send({
    message: "Uploaded",
    id: file.id,
    name: file.filename,
    contentType: file.contentType,
  });
});

const server = app.listen(process.env.PORT || 8765, function () {
  const port = server.address().port;

  console.log("App started at port:", port);
});
