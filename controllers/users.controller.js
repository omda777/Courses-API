const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../models/users.model.js');
const asyncWrapper = require('../middleware/asyncWrapper.js');
const httpStatus = require('../utils/httpStatus.js');
const appError = require('../utils/appError.js');
const generateJWT = require('../utils/generateJWT.js');

const getAllUsers = asyncWrapper( async (req , res) =>{

    const query = req.query;
    const limit = Math.max( 1 ,query.limit || 10);
    const page = Math.max( 1 , query.page || 1) ;
    const skip = (page - 1)* limit;
    const users = await User.find({} ,{'__v' :false , 'password' : false}).limit(limit).skip(skip);

    res.status(200).json({ status: httpStatus.SUCCESS, data: { users } })
})

const registerUser = asyncWrapper ( async (req , res , next)=>{

    const {fullName , email , password} = req.body;

    const oldUser = await User.findOne({email});
    if(oldUser){
        return next(new appError(400 , 'User aready exist' , httpStatus.FAIL));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = User({
        fullName,
        email,
        password: hashedPassword
    })
    const token = await generateJWT({email , id : newUser._id});
    await newUser.save();

    const userWithoutPassword = newUser.toObject();
    delete userWithoutPassword.password;
    userWithoutPassword.token = token;

    res.status(201).json({status : httpStatus.SUCCESS , data : {user : userWithoutPassword}});

})


const loginUser = asyncWrapper( async (req , res , next) => {
    const {email , password} = req.body;
    if(!email || !password){
        return next(new appError(400 , 'Email and password are required' , httpStatus.FAIL));
    }

    const user = await User.findOne({email});
    if(!user){
        return next(new appError(404 , 'User not Found' ,httpStatus.FAIL ));
    }

    const passwordMatched = await bcrypt.compare(password , user.password);
    if(!passwordMatched){
        return next(new appError(401, 'Invalid email or password', httpStatus.FAIL));
    }

    const token = await generateJWT({email , id : user._id});

    res.status(200).json({status:httpStatus.SUCCESS , data : {
        token 
    }});

})


module.exports = {
    getAllUsers,
    registerUser,
    loginUser
};