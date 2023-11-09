const express = require("express");
const router = express.Router();
const ShortURL = require("../models/ShortURLSchema");
const uuid = require("uuid");

const { generateRandomString, isValidURL } = require("../util/utils");

const MAX_RETRIES = 3;
const SUFFIX_LENGTH = 8;

router.post("/", async (req, res) => {
  if (!req.body.originalURL || !isValidURL(req.body.originalURL))
    // Check if original url prop exists and is valid URL
    return res
      .status(400)
      .json({
        message: "Bad Request. OriginalURL does not exist or is not an URL.",
      });

  if (req.body.originalURL.length < 6 || req.body.originalURL.length > 100)
    // Check if Original url is at least 6 and no more than 100 characters.
    return res
      .status(400)
      .json({
        message:
          "Bad Request. Original URL is shorter than 6 or longer than 100 characters.",
      });

  const isCustomSuffix = req.body.shortURLPath ? true : false;
  let linkSuffix = isCustomSuffix
    ? req.body.shortURLPath
    : generateRandomString(SUFFIX_LENGTH);
  let retries = 0;

  const url = await ShortURL.findOne({ URLSuffix: linkSuffix }).exec();

  if (url && isCustomSuffix) {
    // If duplicate url suffix exists and is requested by user, throw an error.
    return res
      .status(500)
      .json({ message: `https://short.ly/${linkSuffix} is already taken.` });
  }

  while (retries < MAX_RETRIES) {
    // Try generating new properties id or generated suffix already exist in DB.
    try {
      const generatedURL = await insertNewLink(
        req.body.originalURL,
        linkSuffix
      );

      return res
        .status(200)
        .json({ message: "OK", shortlink: `https://short.ly/${generatedURL}` });
    } catch (error) {
      if (error.code === 11000) {
        console.log(
          `Duplicate key error on attempt ${retries + 1}, retrying...`
        );

        linkSuffix = generateRandomString(SUFFIX_LENGTH);
        retries++;
      } else {
        console.log("Internal Server Error:", error);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  if (retries === MAX_RETRIES) {
    return res
      .status(500)
      .json({ message: "Internal Server Error (Max Retries)" });
  }
});

const insertNewLink = async (originalURL, URLSuffix) => {
  const id = uuid.v4();
  console.log(id, URLSuffix);
  const shortURLInstance = new ShortURL({
    id: id,
    originalURL: originalURL,
    URLSuffix: URLSuffix,
    referrals: [],
    countries: [],
  });

  const savedShortURL = await shortURLInstance.save();
  console.log("New ShortURL with referral added successfully:", savedShortURL);

  return URLSuffix;
};

module.exports = router;
