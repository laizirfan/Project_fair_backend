const products = require('../modal/projectScheme')


exports.addProject =  async(req,res)=>{
    console.log('inside add request');

   console.log(req.payload);
   
   const userID= req.payload

   
   const projectImage = req.file.filename

   const{title,language,github,website,overview} = req.body

   console.log(title,language,github,website,overview);

   try {
    const exsitingProject = await products.findOne({github})
    
    if(exsitingProject){
        res.status(406).json('already exist')
    }
    else{
        const newProject = new products({
            title,language,github,website,overview,
            projectImage,userID:userID
        })
        await newProject.save()
        res.status(200).json(newProject)


    }

    
   } catch (error) {
    res.status(401).json(`request due ${error}`)
   }


    
}

exports.getAllProjectCont = async(req,res)=>{
 
 const searchKey =req.query.search

    console.log(searchKey);

    
    try {
      
        const query = {
            language : {
                //regular expression and other for case sensitivity
                $regex:searchKey,$options:"i"
            }
        }

       const allProject = await products.find(query) 
       res.status(200).json(allProject)
    } catch (error) {
        res.status(401).json(`resuest fail due to ${error}`) 
    }
}

exports.getProjectCont = async(req,res)=>{
    try {
        const allProject = await products.find().limit(3) 
        res.status(200).json(allProject)
     } catch (error) {
         res.status(401).json(`resuest fail due to ${error}`) 
     }

}

exports.getUserProjects=async(req,res)=>{
    
    const userID = req.payload
    console.log(userID);

    try {

        const allProjectUser = await products.find({userID})
        console.log(allProjectUser);
        res.status(200).json(allProjectUser)
        
    } catch (error) {
        res.status(401).json(`resuest fail due to ${error}`) 
    }

}

exports.deleteProjectCon=async(req,res)=>{

    const {id}= req.params
    try {
        const result = await products.findByIdAndDelete({_id:id})
        res.status(200).json(result)
    } 
    catch (error) {
        res.status(401).json(`resuest fail due to ${error}`) 
    }

}

exports.editProjectCon=async(req,res)=>{
    const {id}= req.params
    const{title,language,github,website,overview,projectImage} = req.body

    const uploadImage = req.file?req.file.filename:projectImage

 
    try {

        const existingProject = await products.findByIdAndUpdate({_id:id},{
            title,language,github,website,overview,projectImage:uploadImage},{new:true})
            
        await existingProject.save() 
        res.status(200).json(existingProject)  
    } catch (error) {
        res.status(401).json(`request fail due to ${error}`) 
        
    }


}