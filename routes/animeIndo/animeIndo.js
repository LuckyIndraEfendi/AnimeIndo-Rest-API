const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();
// const getRecentEpisode = require("../../controllers/animeIndo");

router.get("/", (req, res, next) => {
  res.send("hi");
});

const getRecentEpisode = async (req, res) => {
  try {
    const url = await axios.get(
      `https://185.224.82.193/page/${req.params.page}/`,
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip, compress, deflate, br",
        },
      }
    );
    const $ = await cheerio.load(url.data);
    let animeList = [];

    $("#content-wrap > div.ngiri > div.menu > a").each(function (i, el) {
      animeList.push({
        animeId: this.attribs.href,
        image: $(el).find("div > img").attr("data-original"),
        title: $(el).find(" div > p").text(),
      });
    });
    res.json({
      status: "success",
      data: animeList,
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};

router.get("/recent/:page", getRecentEpisode);

// Watch Anime Indo
const watchAnime = async (req, res) => {
  try {
    const url = await axios.get(`https://185.224.82.193/${req.params.name}/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip,deflate",
      },
    });
    const $ = await cheerio.load(url.data);

    let episodeServer = [];

    $("#content-wrap > div.ngiri > div:nth-child(2) > div.servers").each(
      (i, el) => {
        episodeServer.push({
          bTube: $("#allmiror:first-child").attr("data-video"),
          gdrive: $(el).find("#allmiror:nth-child(2)").attr("data-video"),
          gdriveHd: $(el).find("#allmiror:nth-child(3)").attr("data-video"),
          mp4: $(el).find("#allmiror:nth-child(4)").attr("data-video"),
          mp42: $(el).find("#allmiror:nth-child(5)").attr("data-video"),
        });
      }
    );
    res.json({
      status: "success",
      data: episodeServer,
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};

router.get("/watch/:name", watchAnime);

// Get Anime Movie

const getAnimeMovie = async (req, res) => {
  try {
    const url = await axios.get(
      `https://185.224.82.193/movie/page/${req.params.page}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip,deflate",
        },
      }
    );
    const $ = await cheerio.load(url.data);
    let movieList = [];

    $("#content-wrap > div.menu > table").each((i, el) => {
      movieList.push({
        movieId: $(el).find(" tbody > tr > td.vithumb > a").attr("href"),
        title: $(el).find(" tbody > tr > td.videsc > a").text(),
        type: $(el).find(" tbody > tr > td.videsc > span:nth-child(3)").text(),
        synopsis: $(el).find(" tbody > tr > td.videsc > p").text(),
        release: $(el)
          .find(" tbody > tr > td.videsc > span:nth-child(5)")
          .text(),
        duration: $(el)
          .find("tbody > tr > td.videsc > span:nth-child(4)")
          .text(),
        image: $(el).find("img").attr("data-original"),
      });
    });

    res.json({
      success: "success",
      data: movieList,
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};
router.get("/movie/:page", getAnimeMovie);

// Get Anime Search
const getAnimeSearch = async (req, res) => {
  try {
    const url = await axios.get(
      `https://185.224.82.193/search/${req.params.name}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip,deflate",
        },
      }
    );
    const $ = await cheerio.load(url.data);
    let movieList = [];

    console.log(req.query.name);
    $("#content-wrap > div.menu > table").each((i, el) => {
      movieList.push({
        animeId: $(el).find(" tbody > tr > td.vithumb > a").attr("href"),
        title: $(el).find(" tbody > tr > td.videsc > a").text(),
        type: $(el).find(" tbody > tr > td.videsc > span:nth-child(3)").text(),
        synopsis: $(el).find(" tbody > tr > td.videsc > p").text(),
        release: $(el)
          .find(" tbody > tr > td.videsc > span:nth-child(5)")
          .text(),
        duration: $(el)
          .find("tbody > tr > td.videsc > span:nth-child(4)")
          .text(),
        image: $(el).find("img").attr("data-original"),
      });
    });

    res.json({
      success: "success",
      data: movieList,
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};
router.get("/search/:name", getAnimeSearch);

// #content-wrap > div.ngiri > div.menu > div
// Get Genre List

const getPopularAnime = async (req, res) => {
  try {
    const url = await axios.get(`https://185.224.82.193/`, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip,deflate",
      },
    });
    const $ = await cheerio.load(url.data);
    let popularList = [];

    $("#content-wrap > div.nganan > div.menu > table").each((i, el) => {
      popularList.push({
        title: $(el).find(" tbody > tr > td.zvidesc > a").text(),
        images: $(el).find(" tbody > tr > td.zvithumb > a > img").attr("src"),
        animeId: $(el).find(" tbody > tr > td.zvidesc > a").attr("href"),
        genres: $(el)
          .find(" tbody > tr > td.zvidesc")
          .text()
          .match(/[A-Z][\w ]+(?=,|\s|$)/g)
          .slice(1),
      });
    });

    res.json({
      success: "success",
      data: popularList,
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};
router.get("/popular", getPopularAnime);

const getAnimeDetails = async (req, res) => {
  try {
    const url = await axios.get(
      `https://185.224.82.193/anime/${req.params.animeid}/`,
      {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
          "Accept-Language": "en-US,en;q=0.9",
          "Accept-Encoding": "gzip,deflate",
        },
      }
    );
    const $ = await cheerio.load(url.data);
    let episodeList = [];

    $("#content-wrap > div.ngirix > div:nth-child(4) > div > a").each(
      (i, el) => {
        episodeList.push({
          episode: $(el).attr("href"),
        });
      }
    );

    res.json({
      success: "success",
      data: [
        {
          title: $("#content-wrap > div.ngirix > h1").text(),
          image: $(
            "#content-wrap > div.ngirix > div:nth-child(2) > div > img"
          ).attr("src"),
          synopsis: $(
            "#content-wrap > div.ngirix > div:nth-child(2) > div > p"
          ).text(),
          episodeStream: episodeList,
        },
      ],
    });
  } catch (err) {
    res.send({
      message: "Internal Servel Error",
      status: err,
    });
  }
};
router.get("/details/:animeid", getAnimeDetails);

module.exports = router;
