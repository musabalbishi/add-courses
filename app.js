const express = require("express");
const mongoose = require("mongoose");
const parser = require("body-parser");
const path = require("path");
const dotenv = require("dotenv").config();
mongoose
  .connect(process.env.DB_URI)
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
app.get("/details/:id", async (req, res) => {
  const ccid = req.query.id;
  const cid = User.findById({ cdetails: ccid })
    .then((c) => {
      res.render("details.ejs", { cc: c });
    })
    .catch((e) => {
      res.send(e.message);
    });
  // const user = User;
});
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
  User.deleteOne({ course: courseName })
    .then(() => {
      res.send(`${courseName} has been deleted`);
    })
    .catch((e) => {
      console.log(e.message);
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
