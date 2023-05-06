const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const path = require("path");
mongoose
  .connect(
    "mongodb+srv://meshal:123456789m@cluster0.bwfbl6v.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });
//
const User = require("./models/User");
const app = express();
app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//

//
app.get("/home", (req, res) => {
  res.render("home.ejs");
});
app.post("/courses", (req, res) => {
  let course = req.body.courseName;
  let desc = req.body.courseDiscription;
  let students = req.body.students;
  const create = new User({
    course: course,
    desc: desc,
    student: students,
  });
  //
  create
    .save()
    .then(() => {
      console.log("record inserted");
      res.redirect("/home");
    })
    .catch((error) => {
      console.log(error);
    });
});
//
app.get("/courses", async (req, res) => {
  // retrive data from mongodb collection
  //   const results = await User.find();
  res.render("courses.ejs", { all: results });
});
//
app.listen(8000, () => {
  console.log("listening ...");
});
