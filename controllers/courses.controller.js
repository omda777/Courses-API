const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Course = require("../models/courses.model.js");
const httpStatus = require("../utils/httpStatus");
const appError = require('../utils/appError.js');
const asyncWrapper = require('../middleware/asyncWrapper.js');

const getAllCourses = asyncWrapper(async (req, res) => {
  const query = req.query;
  
  const limit = Math.max( 1 ,query.limit || 10);
  const page = Math.max( 1 , query.page || 1) ;
  const skip = (page - 1)* limit;

  const courses = await Course.find({} , {'__v' : false}).limit(limit).skip(skip);
  res.json({ status: httpStatus.SUCCESS, data: { courses } });
})

const getCourse = asyncWrapper( async (req, res , next) => {

    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course){
      const error = new appError(404 , "Course Not Found" , httpStatus.FAIL );
      return next(error);
    }
    res.json({ status: httpStatus.SUCCESS, data: { course } });
})

const addCourse = asyncWrapper ( (req, res , next) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const error = new appError(400 , err.array() , httpStatus.FAIL );
    return next(error);
  }
  const newCourse = new Course(req.body);
  newCourse.save();
  res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { course: newCourse } });
})

const updateCourse = asyncWrapper( async (req, res , next) => {
  
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedCourse){
      const error = new appError(404 , "Course not found" , httpStatus.FAIL );
      return next(error);
    }

    res.status(202).json({ status: httpStatus.SUCCESS, data: { "course": updatedCourse } });
})

const deleteCourse = asyncWrapper( async (req, res , next) => {
    const result = await Course.deleteOne({ _id: req.params.courseId });

    if (!result.deletedCount){
      const error = new appError(404 , "Course not found" , httpStatus.FAIL );
      return next(error);
    }
    return res.status(200).json({ status: httpStatus.SUCCESS, data: { course: null } });
})

module.exports = {
  getAllCourses,
  getCourse,
  updateCourse,
  addCourse,
  deleteCourse,
};
