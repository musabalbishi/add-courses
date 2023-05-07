const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const path = require("path");

mongoose
  .connect(
    // "mongodb+srv://mosabalbishi:musab123m@cluster0.xsllfeu.mongodb.net/?retryWrites=true&w=majority",
    // { AUTHENTICATION_DATABASE: null }
    "mongodb://0.0.0.0:27017/twuiq"
  )
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
const { off } = require("process");

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
  const results = await User.find();
  res.render("courses.ejs", { all: results });
});

//
// app.get("/details", async (req, res) => {
//   const results = await User.find();
//   for (let i = 0; i < results.length; i++) {
//     res.render("details.ejs", { details: results[i] });
//   }
// });
// READ
app.get("/courses/:cname", (req, res) => {
  const cname = req.params.cname;
  User.find({ course: cname })
    .then((cname) => {
      res.render("courses.ejs", { all: cname });
    })
    .catch((e) => {
      res.send(e.message);
    });
});

// DELETE
app.get("/deleteCourses", (req, res) => {
  const courseName = req.query.course;
  User.deleteOne({ course: courseName }).then(() => {
    res.send(`${courseName} has been deleted`);
  });
});
// UPDATE --> use querey parameter
app.get("/updateCourse/:cname", (req, res) => {
  const newDescription = req.query.newDesc;
  User.findById(req.params.cname).then((c) => {
    c.desc = newDescription;
    c.save()
      .then(() => {
        res.send("updated");
      })
      .catch((e) => {
        res.send(e.message);
      });
  });
});

//
app.listen(8800, () => {
  console.log("listening ...");
});
