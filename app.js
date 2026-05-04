const express = require("express");
const morgan = require("morgan");

require('dotenv').config();
const mongoose = require('mongoose');
const cors = require("cors");

const app = express();

const coursesRouter = require('./routers/courses.route');

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use('/api/courses' , coursesRouter)


app.listen(process.env.PORT || 4000, () => {
  console.log("Server is running on port 4000");
  mongoose.connect(process.env.MONGODB_URL).then(() => {
      console.log("connect is started to mongodb");
    }).catch(() =>{console.log("can't connect to mogodb" );})
});


