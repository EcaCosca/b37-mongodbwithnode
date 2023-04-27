require('dotenv').config()
const express = require("express");
const mongoose = require('mongoose');
const app = express();
// Here I import the Schema I will be using 
const Post = require('./models/post');

const port = 3000 || process.env.PORT

// const mongoDB = 'mongodb://127.0.0.1:27017/my_database';
// const mongoDB = 'mongodb+srv://<username>:<password>@sandbox.apxur.mongodb.net/test';
const mongoDB = process.env.MONGODBURI;
// console.log(mongoDB)
mongoose.connect(mongoDB);

const db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// CREATE - Using .create() over the Schema that we have declared in the models folder
app.post("/messages", (req, res) =>
Post
   .create({ title: "More Interesting", author: "Lazar", body: "lorem ipsum, I prefer mate over coffee" })
   .then((newMessage) => {
     res.send(newMessage);
   })
   .catch(err => res.send(err))
);


// READ - Using .find()
// OLD WAY | MongooseError: Model.find() no longer accepts a callback
// app.get("/", (req, res) =>
//   Post
//    .find({}, (err, data) => res.send(data))
// );

// NEW WAY 
app.get("/", (req, res) =>
  Post
   .find({})
   .then((models) => {
    res.send(models);
  })
  .catch((err) => {
    res.send(err);
  })
);

app.get("/single", (req, res) =>
 Post
.find({author:"Enrique"})
.then((models) => {
    res.send(models);
  })
  .catch((err) => {
    res.send(err);
  })
);

// UPDATE - updateMany()
app.put("/", (req, res) =>
 Post
   .updateMany({title: "More Interesting"}, { $set: { title: "New Title" } })
   .then(function (newPosts) {
     res.send(newPosts);
   })
);

// DELETE - .deleteOne()
app.delete("/:id", (req, res) =>
 Post
   .deleteOne({_id: req.params.id})
   .then(function () {
     res.end();
   })
);





app.listen(port, () => console.log(`Your server is running on http://localhost:${port}/`));