const { validationResult } = require("express-validator");
const mongoose = require("mongoose");

const Course = require("../models/courses.model.js");
const httpStatus = require("../utils/httpStatus");

const getAllCourses = async (req, res) => {
  const courses = await Course.find();
  res.json({ status: httpStatus.SUCCESS, data: { courses } });
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });
    if (!course)
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, data: {  msg : err.array() ,course: null } });

    res.json({ status: httpStatus.SUCCESS, data: { course } });
  } catch (e) {
    res.status(400).json({ status: httpStatus.ERROR, data: { msg: e } });
  }
};

const addCourse = (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res
      .status(400)
      .json({ status: httpStatus.FAIL, data: { msg :err.array() } });
  }
  const newCourse = new Course(req.body);
  newCourse.save();
  res
    .status(201)
    .json({ status: httpStatus.SUCCESS, data: { course: newCourse } });
};

const updateCourse = async (req, res) => {
  try {
    const updatedCourse = await Course.findOneAndUpdate(
      { _id: req.params.courseId },
      req.body,
      { returnDocument: "after", runValidators: true },
    );
    if (!updatedCourse)
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, data: { course: null } });
    res
      .status(202)
      .json({ status: httpStatus.SUCCESS, data: { "course": updatedCourse } });
  } catch (e) {
    res.status(400).json({ status: httpStatus.ERROR, msg: e.message });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const result = await Course.deleteOne({ _id: req.params.courseId });

    if (!result.deletedCount)
      return res
        .status(404)
        .json({ status: httpStatus.FAIL, data: { course: null } });

    return res
      .status(200)
      .json({ status: httpStatus.SUCCESS, data: { course: null } });
  } catch (e) {
    console.log(e);
    res.status(400).json({ status: httpStatus.ERROR, msg: e.message });
  }
};

module.exports = {
  getAllCourses,
  getCourse,
  updateCourse,
  addCourse,
  deleteCourse,
};
