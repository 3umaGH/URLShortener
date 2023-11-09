const express = require("express");
const app = express();
require("dotenv").config();


app.use("/action", require("./routes/Action"));
app.use("/", require("./routes/ShortenedURL"));



app.listen(process.env.LISTEN_PORT);
