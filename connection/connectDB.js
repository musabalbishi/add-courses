const mongoose = require("mongoose");
//
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
