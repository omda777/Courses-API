const express = require('express');
const usersController = require('../controllers/users.controller.js')
const verifyToken = require('../middleware/verifyToken.js');
const router = express.Router( );

router.route('/').get(verifyToken , usersController.getAllUsers);
router.route('/register').post(usersController.registerUser);
router.route('/login').post(usersController.loginUser)
            
               
module.exports  = router ;