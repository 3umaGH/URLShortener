const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // limit each IP to 60 requests per windowMs
  handler: (req, res) => {
    console.log(req.ip, "has been rate limited.");
    return res
      .status(429)
      .json({ message: "Too many requests, please try again later" });
  },
});

module.exports = limiter;
