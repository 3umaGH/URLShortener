const mongoose = require("mongoose");

const ShortURLSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  originalURL: {
    type: String,
    required: true,
  },
  URLSuffix: {
    type: String,
    required: true,
    unique: true,
  },
  referrals: [
    {
      referralUrl: String,
      count: Number,
    },
  ],
  countries: [
    {
      country: String,
      count: Number,
    },
  ],
});

ShortURLSchema.index({ "referrals.referralUrl": 1 });

const ShortURL = mongoose.model("ShortURL", ShortURLSchema);

module.exports = ShortURL;
