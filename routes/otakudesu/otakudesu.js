const express = require("express");
const router = express.Router();
const {
  getRecentEpisode,
  getTopAnime,
  getGenreAnime,
  getGenreAnimeSearch,
  getAnimeDetails,
  getListAnime,
  getWatchAnime,
} = require("./parser");

router.get("/", (req, res) => {
  res.send("Otakudesu Server is Ready");
});
router.get("/recent/:page", getRecentEpisode);
router.get("/popular", getTopAnime);
router.get("/genre", getGenreAnime);
router.get("/genre/:name", getGenreAnimeSearch);
router.get("/details/:animeId", getAnimeDetails);
router.get("/animelist", getListAnime);
router.get("/watch/:animeId", getWatchAnime);

module.exports = router;
