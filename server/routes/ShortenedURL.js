const express = require("express");
const router = express.Router();
const ShortURL = require("../models/ShortURLSchema");
const { getGeoInfo } = require("../util/utils");

router.get("/:url", async (req, res) => {
  const URLSuffix = req.params.url;

  if (!URLSuffix || URLSuffix.length > 30)
    return res.redirect(process.env.REDIRECT_URL);

  const referralUrl = req.get("Referer") || "Direct connection";
  const country = await getGeoInfo(
    req.headers["x-forwarded-for"] || req.socket.remoteAddress
  );

  console.log("xforwarded", req.headers["x-forwarded-for"])
  console.log("remote:", req.socket.remoteAddress)

  const shortLink = await ShortURL.findOne({ URLSuffix: URLSuffix }).exec();

  if (shortLink) {
    // If shortLink exists
    // Update the referrals array
    ShortURL.findOneAndUpdate(
      { URLSuffix: URLSuffix, "referrals.referralUrl": { $ne: referralUrl } },
      {
        $addToSet: {
          referrals: { referralUrl: referralUrl, count: 0 },
        },
      }
    )
      .exec()
      .then(() => {
        // Increment count if the referralUrl already exists
        return ShortURL.findOneAndUpdate(
          { URLSuffix: URLSuffix, "referrals.referralUrl": referralUrl },
          { $inc: { "referrals.$.count": 1 } },
          { new: true } // To return the modified document
        ).exec();
      })
      .then(() => {
        // Update the countries array
        return ShortURL.findOneAndUpdate(
          { URLSuffix: URLSuffix, "countries.country": { $ne: country } },
          {
            $addToSet: {
              countries: { country: country, count: 0 },
            },
          }
        ).exec();
      })
      .then(() => {
        // Increment count if the country already exists
        return ShortURL.findOneAndUpdate(
          { URLSuffix: URLSuffix, "countries.country": country },
          { $inc: { "countries.$.count": 1 } },
          { new: true } // To return the modified document
        ).exec();
      })
      .then(() => {
        // Increment totalClicks count
        return ShortURL.findOneAndUpdate(
          { URLSuffix: URLSuffix },
          { $inc: { totalClicks: 1 } },
          { new: true } // To return the modified document
        ).exec();
      })
      .then((updatedDocument) => {
        res.redirect(shortLink.originalURL);
        console.log(updatedDocument);
      })
      .catch((error) => {
        // Could not update the stats arrays, simply redirect then.
        res.redirect(shortLink.originalURL);
        console.error(error);
      });
  } // If short URL is not found.
  else return res.redirect(process.env.REDIRECT_URL);

});

module.exports = router;
