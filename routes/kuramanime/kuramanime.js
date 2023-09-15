const express = require("express");
const router = express.Router();
const {
  getOngoingAnime,
  getScheeduleAnime,
  getPropertiesAnime,
  getPropertiesGenre,
  getDetailsAnime,
  getSearchAnime,
  getRecentRelease,
  getAnimeEpisode,
} = require("./parser");

router.get("/", function (req, res) {
  res.json({
     message: "Welcome to the LuckyAnime API!",
  });
});
router.get("/ongoing", getOngoingAnime);
router.get("/schedule", getScheeduleAnime);
router.get("/properties", getPropertiesAnime);
router.get("/properties/genre/:genreName", getPropertiesGenre);
router.get("/details/anime/:animeId/:animeIdTitle", getDetailsAnime);
router.get("/search", getSearchAnime);
router.get("/recent", getRecentRelease);
router.get(
  "/watch/anime/:animeName/:animeId/episode/:episodeId",
  getAnimeEpisode
);

module.exports = router;
