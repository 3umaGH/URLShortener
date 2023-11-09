const express = require("express");
const app = express();
require('dotenv').config();


app.get("*", (req, res) => {
    return res.status(404).json({ message: "Page not found." });
  });
  
app.listen(process.env.LISTEN_PORT);

console.log(process.env.LISTEN_PORT);