const express = require("express");
const app = express();
const multer = require("multer");
// var cors = require("cors");
// app.options("*", cors());

// setup multer for file upload
var storage = multer.diskStorage({
  destination: "src/img",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
// serving front end build files
app.use(express.static("../src/img"));
// route for file upload
app.post("/api/uploadfile", upload.single("file"), (req, res, next) => {
  console.log(req.file.originalname + " file successfully uploaded !!");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.sendStatus(200);
});

app.listen(5000, () => console.log("Listening on port 5000"));
