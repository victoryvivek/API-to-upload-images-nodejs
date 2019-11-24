const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const mutter = require("mutter");
const axios = require("axios");
const FormData = require("form-data");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

const CLOUDINARY_API_URL =
  "https://api.cloudinary.com/v1_1/dxjw59s8q/image/upload";
const CLOUDINARY_PRESET = "ub8x4sqg";

cloudinary.config({
  cloud_name: "dxjw59s8q",
  api_key: "368959491475955",
  api_secret: "mSsNmFWiWXb2-0hmq6PtgFoE4xM"
});

const app = express();

app.listen(8000, () => {
  console.log("server running");
});

// const x ="https://images.unsplash.com/photo-1572288623190-5bb8b0d81aa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
// console.log(encodeURIComponent(x));

app.get("/", (req, res, next) => {
  const url = req.query.val;
  console.log("url : " + url);

  let storage = path.resolve(__dirname, "files", "images.jpg");
  let x = storage.toString();


  axios({
    url: url,
    method: "GET",
    responseType: "stream"
  }).then(resp => {
    resp.data.pipe(fs.createWriteStream(storage));
    cloudinary.uploader.upload(x).then(result=>{
      return res.json({
        message:'Image uploaded',
        result:result
      });
    }).catch(err=>{
      console.log(err);
    });
  });
  
});
