const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const path = require("path");

mongoose
  .connect("mongodb://0.0.0.0:27017/twuiq", {})
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error);
  });
//
const app = express();
app.set("view engine", "ejs");
app.use(parser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
const User = require("./models/User");

// const create = new User({
//   course: "course",
//   desc: "desc",
//   student: 33,
// });
// //
// create
//   .save()
//   .then(() => {
//     console.log("record inserted");
//     // res.redirect("/home");
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//

//
app.get("/", (req, res) => {
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
      res.redirect("/");
    })
    .catch((error) => {
      console.log(error);
    });
});
//
app.get("/courses", async (req, res) => {
  // retrive data from mongodb collection
  const results = await User.find();
  res.render("courses.ejs", { all: results });
});
//
// app.post("/courses", async (req, res) => {
//   let course = req.body.search;
//   const results = await User.find();
//   res.render("courses.ejs", { query: results });
// });
//
app.listen(8000, () => {
  console.log("listening ...");
});
