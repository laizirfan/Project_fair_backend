//model for usercollection

const mongoose = require('mongoose')

//schema structure

const userSchema = mongoose.Schema({
    username : {
        require : true,
        type:String

    },
    mailId : {
        require:true,
        type:String
    },
    password : {
        require:true,
        type:String
    },
    linkedin : {
        type:String
    },
    Github : {
        type:String
    },
    Profile : {
        type:String
    }
})


const users = mongoose.model('users',userSchema)

module.exports = users