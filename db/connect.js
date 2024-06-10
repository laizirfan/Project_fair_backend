
//import mongoose

const mongoose = require('mongoose')

const connectString = process.env.DATABASE


mongoose.connect(connectString).then(()=>{
    console.log('connection made');
}).catch((err)=>{
    console.log(err);
})