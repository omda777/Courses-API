const JWT = require('jsonwebtoken');
const AppError = require('../utils/appError');
const httpStatus = require('../utils/httpStatus');

module.exports = (req , res , next) =>{
    authHeader = req.headers['Authorization'] ||req.headers['authorization'] ;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return next(new AppError(401,'Token is required',httpStatus.FAIL ));
    }
    const token = authHeader.split(' ')[1];
    try{
        JWT.verify(token , process.env.JWT_SECRET_KEY);
        next();
    }catch(err){
        return next(new AppError(401 ,err.message , httpStatus.FAIL));
    }
}