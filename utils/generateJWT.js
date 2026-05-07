const JWT = require('jsonwebtoken');

module.exports = async (payload) =>{
    return await JWT.sign(payload , process.env.JWT_SECRET_KEY ,{expiresIn: '1d'});
}