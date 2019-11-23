const express = require('express');
const bodyParser = require('body-parser');
const mutter = require('mutter');

const app = express();

app.listen(8000,()=>{
    console.log('server running');
})