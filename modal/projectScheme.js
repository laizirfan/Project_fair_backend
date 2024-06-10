
const mongoose = require('mongoose')

const projectScheme = new mongoose.Schema({
    title : {
        required : true,
        type : String
    },
    language : {
        required : true,
        type : String
    },
    github : {
        required : true,
        type : String
    },
    website :  {
        required : true,
        type : String
    },
    overview :   {
        required : true,
        type : String
    },
    projectImage :  {
        required : true,
        type : String
    },
    userID : {
        required : true,
        type : String

    }
})

const products = mongoose.model('products',projectScheme)

module.exports =products