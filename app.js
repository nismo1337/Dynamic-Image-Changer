const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const imageDir = path.join(__dirname, "images"); 

app.get("/", (req, res) => {
  res.send("Welcome to the Random Image Generator!");
});

app.get("/meow.png", (req, res) => {
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Error reading directory");
    }

    const imageFiles = files.filter(file => {
      return file.toLowerCase().endsWith(".jpg") || file.toLowerCase().endsWith(".png");
    });

    if (imageFiles.length === 0) {
      return res.status(404).send("No images found");
    }

    const randomIndex = Math.floor(Math.random() * imageFiles.length);
    const randomImage = path.join(imageDir, imageFiles[randomIndex]);

    res.sendFile(randomImage); 
  });
});

const port = process.env.PORT || 3000; 

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

