const express = require("express");
const morgan = require("morgan");
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");

const httpStatus = require('./utils/httpStatus');

const app = express();

const coursesRouter = require('./routers/courses.route');
const usersRouter = require('./routers/users.route');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/courses' , coursesRouter);
app.use('/api/users' , usersRouter);

app.use((req, res) => {
  return res.status(404).json({
    status: httpStatus.ERROR,
    msg: "the resource is not available"
  });
});

app.use((error , req , res , next) =>{
  res.status(error.statusCode || 500).json({status:error.statusText || "error" , msg : error.message , statusCode:error.statusCode || 500 , data : null})
})

app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
  mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("connect is started to mongodb");
    }).catch(() =>{console.log("can't connect to mogodb" );})
});


