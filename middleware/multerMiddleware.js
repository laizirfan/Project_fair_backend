//importing multer

const multer = require('multer')

//2)creating storage space in server ...name of file as filename 

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        /* date now gives millisecond */
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)

    }
})

//3) provideing file filter (for image in jpeg or png)

const fileFilter = (req,file,callback)=>{
    if(file.mimetype=='image/png' || file.mimetype == 'image/jpg' | file.mimetype == 'image/jpeg'){
        callback(null,true)
    }
    else {
        callback(null,false)
         return callback(new Error ('only png , jpg , jpeg are accepted'))
    }
}

// calling multer

const multerConfig = multer({
    storage,
    fileFilter
})

module.exports = multerConfig