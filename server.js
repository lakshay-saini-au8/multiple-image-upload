const express = require("express");
const dotenv = require("dotenv");
const fs = require("fs");
const connectDB = require("./config/db.js");
const app = express();
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const Image = require("./model/Image.model");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dotenv.config();
connectDB();

app.post("/upload-images", upload.array("image"), async (req, res) => {
  const uploader = async (path) => await cloudinary.uploads(path, "Images");

  const { path } = req.files[0];
  const newPath = await uploader(path);
  fs.unlinkSync(path);
  const image = await Image.create({
    imageUrl: newPath.url,
  });
  res.status(200).send({ message: "Uploaded", url: image });
});
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(5501, console.log("server is running"));
