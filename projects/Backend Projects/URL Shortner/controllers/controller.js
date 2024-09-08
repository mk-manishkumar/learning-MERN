import { url } from "../models/url.js";
import shortid from "shortid";

export const urlShort = async (req, res) => {
  const longUrl = req.body.longUrl;
  const shortCode = shortid.generate();
  const shortUrl = `http://localhost:3000/${shortCode}`;

  const newUrl = new url({ shortUrl, longUrl });
  await newUrl.save();

  res.render("index", { shortUrl });
};

export const getOriginalUrl = async (req, res) => {
  const shortCode = req.params.shortCode;

  const urlRecord = await url.findOne({ shortCode });

  if (urlRecord) {
    res.redirect(urlRecord.longUrl);
  } else {
    res.status(404).send("URL not found");
  }
};