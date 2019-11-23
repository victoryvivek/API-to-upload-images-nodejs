const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const mutter = require('mutter');
const axios = require('axios');
const FormData = require('form-data');
const cloudinary = require('cloudinary').v2;
const fs= require('fs');
const path = require('path');

const CLOUDINARY_API_URL = "https://api.cloudinary.com/v1_1/dxjw59s8q/image/upload";
const CLOUDINARY_PRESET = "ub8x4sqg";

cloudinary.config({
  cloud_name: "dxjw59s8q",
  api_key: "368959491475955",
  api_secret: "mSsNmFWiWXb2-0hmq6PtgFoE4xM,"
});

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

const x =
  "https://images.unsplash.com/photo-1572279048571-42b7e3b230ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";

console.log(encodeURIComponent(x));


app.listen(8000,()=>{
    console.log('server running');
});


// const upload = multer({dest:'uploads/'});

// app.get('/home',upload.single('val'),(req,res,next)=>{

// });


app.get("/home", (req, res, next) => {
  const url = req.query.val;
  console.log("url : " + url);

  var name= new Date().toISOString()+'.jpg';
  let storage=path.resolve(__dirname,'files','images.jpg');
    console.log(storage);
    let x = storage.toString();
    console.log(x);
  axios({
    url: url,
    method: 'GET',
    responseType:'stream'
  }).then(resp=>{
      resp.data.pipe(fs.createWriteStream(storage));
      cloudinary.uploader.upload(x,function(err,result){
          console.log(err);
        
        
      });
  }).catch(err=>{
      console.log(err);
  });

//   https
//     .get(url, resp => {
//       let data = "";

//       resp.on("data", d => {
//         data += d;
//       });

//     //   var parseFile = new Parse.File('landscape');
//     //   parseFile.save().then(()=>{
//     //       console.log('URL : '+parseFile.url());
//     //   }).catch(err=>{
//     //       console.log(err);
//     //   });

//       var formData = new FormData();
//       formData.append("file", data);
//       formData.append("upload_preset", CLOUDINARY_PRESET);

//     //   cloudinary.uploader.upload('',function(err,result){

//     //   });

  return res.json({
    message: "Request Procesing"
  });


// app.get('/home',(req,res,next)=>{
//     const url = req.query.val;
//     console.log('url : '+url);
    
//     https.get(url, resp=>{

//         let data='';

//         resp.on('data',d=>{
//             data+=d;
//         });

//         var formData = new FormData();
//         formData.append('file',data);
//         formData.append('upload_preset',CLOUDINARY_PRESET);

//         axios({
//           url: CLOUDINARY_API_URL,
//           method: 'POST',
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded"
//           },
//           data: formData
//         })
//           .then(res => {
//             // console.log(res);
//           })
//           .catch(err => {
//             console.log(err);
//           });

//     }).on('error', (e) => {
//         console.error(e);
//     });

//     return res.json({
//         message:'Request Procesing'
//     });
// });

});