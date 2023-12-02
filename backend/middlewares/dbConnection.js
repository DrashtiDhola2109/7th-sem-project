const mongoose = require('mongoose');

const connection = mongoose.connect("mongodb://127.0.0.1:27017/skmasala")
.then(()=>{
    console.log("Connection established");
})
.catch((err)=>{
    console.log("Error connecting"+err.message);
})