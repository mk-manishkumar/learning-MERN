import { getShortUrl } from "../dao/shortUrl.js";
import { createShortUrlWithoutUser, createShortUrlWithUser } from "../services/shortUrl.service.js";
import wrapAsync from "../utils/tryCatchWrapper.js";

// create short url controller
export const createShortUrl = wrapAsync(async (req, res) => {
  const data = req.body;
  let shortUrl;
  if (req.user) shortUrl = await createShortUrlWithUser(data.url, req.user._id, data.slug);
  else shortUrl = await createShortUrlWithoutUser(data.url);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});

// redirect from short url controller
export const redirectFromShortUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const url = await getShortUrl(id);
  if (!url) throw new Error("Short URL not found");
  res.redirect(url.full_url);
});

// create custom short url controller
export const createCustomShortUrl = wrapAsync(async (req, res) => {
  const { url, slug } = req.body;
  const shortUrl = await createShortUrlWithoutUser(url, slug);
  res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
});
