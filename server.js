const express = require("express");
const got = require("got");

const app = express();

const getRandomGifUrl = tag => {
  return `https://api.giphy.com/v1/gifs/random?api_key=${process.env.GIPHY_API_KEY}&tag=${tag}&rating=g`;
};

app.get("/", async (req, res) => {
  const { mood } = req.query;
  try {
    const { body } = await got(getRandomGifUrl(mood), {
      responseType: "json"
    });
    res.redirect(body.data.images.downsized_large.url);
  } catch (error) {
    console.error(error);
    res.json(error);
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
