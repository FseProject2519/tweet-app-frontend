const express = require("express");
const app = express();
const multer = require("multer");

var storage = multer.diskStorage({
  destination: "src/img",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static("../src/img"));
app.post("/api/uploadfile", upload.single("file"), (req, res, next) => {
  console.log(req.file.originalname + " file successfully uploaded !!");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.sendStatus(200);
});

app.listen(5000, () => console.log("Listening on port 5000"));
