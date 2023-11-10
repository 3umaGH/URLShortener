const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require('dotenv').config()

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// DB
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`;

//const uri = `mongodb://root:abvUdGuj46Xn78CD@95.179.187.231:27017/ShortURL`;

// Connect to MongoDB
const connect = () => {
  mongoose.connect(uri);
};

// Listen for the connection event
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected");
});

// Listen for the error event
mongoose.connection.on("error", (err) => {
  console.log("Mongoose connction error: " + err);
});

// Listen for the disconnection event
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected trying to reconnect.");

  setTimeout(() => {
    mongoose.connect(uri);
  }, 1000);
});

connect();

app.use("/action",express.json(), require("./routes/Action"));
app.use("/", require("./routes/ShortenedURL"));

app.listen(process.env.LISTEN_PORT);
