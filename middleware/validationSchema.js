const {body} = require('express-validator');

const validationCourses = [
        body('name')
            .notEmpty().withMessage('invalid the name must not empty!!')
            .isLength({min:2}).withMessage('invalid the name at least 2 characters!!') ,
        body('price')
            .notEmpty().withMessage('invalid the price must not empty!!')
            .isNumeric().withMessage('invalid the price must be number!!')
            .isInt({min:0}).withMessage('invalid the price must be positive number!!')

];

module.exports = validationCourses;