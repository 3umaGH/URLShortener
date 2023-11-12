const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const rateLimiter = require("./middleware/RateLimiter");

require("dotenv").config();

app.use(rateLimiter);

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

// DB
const uri = `${process.env.MONGO_URL}`;

// Connect to MongoDB
const connect = () => {
  mongoose.connect(uri, { dbName: process.env.DB_NAME });
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

app.use("/action", express.json(), require("./routes/Action"));
app.use("/", require("./routes/ShortenedURL"));

app.listen(process.env.LISTEN_PORT, "::");
