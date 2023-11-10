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
  totalClicks: {
    type: Number,
    required: true,
    default: 0,
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
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

ShortURLSchema.index({ "referrals.referralUrl": 1 });

const ShortURL = mongoose.model("ShortURL", ShortURLSchema);

module.exports = ShortURL;
