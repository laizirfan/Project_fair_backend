//////////import statments
//1.imort dotenv

require('dotenv').config()  //now it will be added to process.env

//2.import express

const express = require('express')

//3.import cors

const cors = require('cors')

//import router

const router = require('./router')


// 4.create server

const projectExhibitServer = express()

//5.use cors to connect with frontend

projectExhibitServer.use(cors())

//6.json() - middleware -- for converting json format to JS

projectExhibitServer.use(express.json())

//// server use router if used this before ther will be error

projectExhibitServer.use(router)

require('./db/connect')


///first name called second is upload
projectExhibitServer.use('/uploads',express.static('./uploads'))



//7.set port

const PORT = 8003 || process.env.PORT

//run server

projectExhibitServer.listen(PORT,()=>{
    console.log(`Server Running at ${PORT}`);
})

//get 
projectExhibitServer.get('/',(req,res)=>{

    res.send('get request ')

})

//put
/*projectExhibitServer.put('/',(req,res)=>{
    res.send('put request')
})

//
projectExhibitServer.post('/',(req,res)=>{
    res.send('post request')
})

///nodemon --auto compilatin*/
