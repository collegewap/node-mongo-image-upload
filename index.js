const express = require("express");
const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");
const url = "mongodb://localhost:27017/images";

// Create a storage object with a given configuration
const storage = new GridFsStorage({
  url,
  file: (req, file) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
      return {
        bucketName: "photos",
      };
    } else {
      return null;
    }
  },
});

// Set multer storage engine to the newly created object
const upload = multer({ storage });

const app = express();

// Upload your files as usual
app.post("/upload/image", upload.single("avatar"), (req, res, next) => {
  /*....*/
  res.send({ message: "Uploaded", id: req.file.id.toString() });
});

const server = app.listen(process.env.PORT || 8765, function () {
  const port = server.address().port;

  console.log("App started at port:", port);
});
