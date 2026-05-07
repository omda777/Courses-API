const express = require('express');
const {body} = require('express-validator');
const valdiationCourses = require('../middleware/validationSchema');
const coursesController = require('../controllers/courses.controller.js')
const router = express.Router( );

router.route('/')
            .get(coursesController.getAllCourses)
            .post(valdiationCourses,coursesController.addCourse);
      
router.route('/:courseId')
            .get(coursesController.getCourse)
            .patch(coursesController.updateCourse)
            .delete(coursesController.deleteCourse);

            
module.exports  = router ;