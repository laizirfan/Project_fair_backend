
//1.import 
const express = require('express')

//usercon

const userCon = require('./controllers/userCon')

const projectControl = require('./controllers/projectControl')

const jwtMidware = require('./middleware/jwtMidware')

const multerConfig = require('./middleware/multerMiddleware')
const multer = require('multer')

//2.to create router we use class  router in express using object

const router = new express.Router()

///path  for register
router.post('/user/register',userCon.register)

///path for login request
router.post('/user/login',userCon.login)


///path to add projecrout

router.post('/projects',jwtMidware,multerConfig.single('projectImage'),projectControl.addProject)

///path to get all products
router.get('/all-product',projectControl.getAllProjectCont)

//path to get home project
router.get('/home-project',projectControl.getProjectCont)


///path for user roject
router.get('/user/all-project',jwtMidware,projectControl.getUserProjects)


///path to delete a project
router.delete('/delete-project/:id',jwtMidware,projectControl.deleteProjectCon)

//path to update

router.put('/update-project/:id',jwtMidware,multerConfig.single('projectImage'),projectControl.editProjectCon)

//path to update profile
router.put('/update-profile',jwtMidware,multerConfig.single('profile'),userCon.updateProfileCon)


//this router export to be imported in index js

module.exports = router