
const jwt = require('jsonwebtoken')

const jwtMidware = (req,res,next)=>{
  console.log('inside jwt mid');

  const token = req.headers['authorization'].split(" ")[1]
  console.log(token);

try {
    const jwtResponse = jwt.verify(token,'secretkey')
    console.log(jwtResponse);
    req.payload = jwtResponse.userID
    next()

} catch (error) {
    res.status(401).json(`authorization fail due to ${error}`)
}


 
}

module.exports = jwtMidware