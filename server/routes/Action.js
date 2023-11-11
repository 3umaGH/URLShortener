const express = require("express");
const router = express.Router();
const ShortURL = require("../models/ShortURLSchema");
const uuid = require("uuid");

require("dotenv").config();

const {
  generateRandomString,
  isValidURL,
  isValidCharacters,
} = require("../util/utils");

const MAX_RETRIES = 3;

router.post("/", async (req, res) => {
  if (
    !req.body.originalURL ||
    !isValidURL(req.body.originalURL)
  )
    // Check if original url prop exists and is valid URL
    return res.status(400).json({
      message:
        "Invalid URL, Make sure your URL starts with http:// or https://",
    });

  if (
    req.body.originalURL.length < process.env.MIN_ORIGINAL_URL_LENGTH ||
    req.body.originalURL.length > process.env.MAX_ORIGINAL_URL_LENGTH
  ) {
    // Check if Original url is at least 6 and no more than 100 characters.
    return res.status(400).json({
      message: `URL is shorter than ${process.env.MIN_ORIGINAL_URL_LENGTH} or longer than ${process.env.MAX_ORIGINAL_URL_LENGTH} characters.`,
    });
  }

  if (
    req.body.shortURLPath &&
    req.body.shortURLPath.length > process.env.MAX_CUSTOM_SUFFIX_LENGTH
  )
    return res.status(400).json({
      message: `URL back-half is longer than ${process.env.MAX_ORIGINAL_URL_LENGTH} characters.`,
    });

  if (!req.body.shortURLPath === "" && !isValidCharacters(req.body.shortURLPath))
    return res.status(400).json({
      message: `Only A-Z characters and numbers allowed.`,
    });

  const isCustomSuffixRequested = req.body.shortURLPath ? true : false;
  let linkSuffix = isCustomSuffixRequested
    ? req.body.shortURLPath
    : generateRandomString(process.env.GENERATED_SUFFIX_LENGTH);
  let retries = 0;

  const url = await ShortURL.findOne({ URLSuffix: linkSuffix }).exec();

  if (url && isCustomSuffixRequested) {
    // If duplicate url suffix exists and is requested by user, throw an error.
    return res.status(500).json({
      message: `${process.env.DOMAIN}${linkSuffix} is already taken.`,
    });
  }

  while (retries < MAX_RETRIES) {
    // Try generating new properties id or generated if suffix already exist in DB.
    try {
      const shortURLInstance = await insertNewLink(
        req.body.originalURL,
        linkSuffix
      );

      return res.status(200).json({
        message: "OK",
        uuid: `${shortURLInstance.id}`,
        originalURL: `${shortURLInstance.originalURL}`,
        shortLink: `${shortURLInstance.URLSuffix}`,
      });
    } catch (error) {
      if (error.code === 11000) {
        console.log(
          `Duplicate key error on attempt ${retries + 1}, retrying...`
        );

        linkSuffix = generateRandomString(SUFFIX_LENGTH); // Generate new URL suffix, because apparently it already exists.
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

  const shortURLInstance = new ShortURL({
    id: id,
    originalURL: originalURL,
    URLSuffix: URLSuffix,
    referrals: [],
    countries: [],
  });

  const savedShortURL = await shortURLInstance.save();
  console.log("New ShortURL with referral added successfully:", savedShortURL);

  return shortURLInstance;
};

router.get("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  if (!uuid || uuid.length !== 36)
    return res.status(400).json({
      message: "Invalid uuid format.",
    });

  const shortLink = await ShortURL.findOne({ id: uuid }).exec();

  if (!shortLink)
   return res.status(404).json({
      message: "UUID not found.",
    });
  else return res.status(200).json({ message: "OK", shortLink });
});

router.delete("/:uuid", async (req, res) => {
  const uuid = req.params.uuid;

  if (!uuid || uuid.length !== 36)
   return  res.status(400).json({
      message: "Invalid uuid format.",
    });

  const shortLink = await ShortURL.findOneAndDelete({ id: uuid }).exec();

  if (!shortLink)
    return res.status(404).json({
      message: "UUID not found.",
    });
  else return res.status(204).send();
});

module.exports = router;
