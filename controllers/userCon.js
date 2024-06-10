//logic for regitser request

const users = require("../modal/userScheme");

///jwt library

const jwt= require("jsonwebtoken")

exports.register = async(req,res)=>{
    console.log('inside register');
    const{username,email,password} = req.body

    console.log(username,email,password);

    try {
        const exsistingUser = await users.findOne({mailId:email})
        if(exsistingUser){
            res.status(406).json('Account Exist already')
        }
        else{
            ///object create for modal
            const newUser = new users({
                username,
                mailId:email,
                password,
                linkedin:"",
                Github:"",
                Profile:""
            })
            ///to save
            await newUser.save()
            //response
            res.status(200).json(newUser)


        }
        
    } catch (error) {
        res.status(401).json(error)
    }
   

}

///login controller

exports.login = async(req,res)=>{
    console.log("inside login");
    const {email,password} = req.body;

    try {
        const exsistingUser =await users.findOne({mailId:email,password})
        
        if(exsistingUser){

            const token = jwt.sign({userID:exsistingUser._id},'secretkey') 
            
            res.status(200).json({
                exsistingUser,
                token
            })

        }
        else{
            res.status(401).json('Invalid email or password')
        }
        
    } catch (error) {
        res.status(401).json(`request failed due to error ${error}`)
        
    }
}

///profile update

exports.updateProfileCon = async(req,res)=>{
    const userID = req.payload
    const{username,email,password,github,linkedin,profile} = req.body
    
    ProfileImage = req.file?req.file.filename:profile
    try {
        const exsistingUser = await users.findByIdAndUpdate({_id:userID},
            {username,mailId:email,password,Github:github,linkedin:linkedin,Profile:ProfileImage},{new:true} )
            await exsistingUser.save()
            res.status(200).json(exsistingUser)
        
    } 
    catch (error) {
        res.status(401).json(`request failed due to error ${error}`)
       
    }
}
