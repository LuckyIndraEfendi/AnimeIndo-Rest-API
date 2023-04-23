const express = require("express");
const axios = require("axios");
const puppeteer = require("puppeteer");
const router = express.Router();

const request = require("request");
const cheerio = require("cheerio");

router.get("/", (req, res) => {
  res.send("Kuramanime Server Is Ready");
});

const getOngoingAnime = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/anime/ongoing?order_by=${
      req.query.order_by || "latest"
    }&page=${req.query.page || 1}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };
  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          title: $(e).find("div > h5 > a").text(),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
                .trim()
            : "",
          animeIdSlug: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          image: $(e).find("a > div").attr("data-setbg"),
          episode: $(e)
            .find(" a > div > div.ep > span")
            .text()
            .replace(/\s+/g, " ")
            .trim(),
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        page: req.query.page || 1,
        order_by: req.query.order_by || "latest",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};
router.get("/ongoing", getOngoingAnime);

const getScheeduleAnime = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/schedule?scheduled_day=${
      req.query.scheduled_day || "all"
    }&page=${req.query.page || 1}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          title: $(e).find("div > h5 > a").text(),
          image: $(e).find(" a > div").attr("data-setbg"),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
                .trim()
            : "",
          animeIdSlug: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          image: $(e).find("a > div").attr("data-setbg"),
          days: $(e)
            .find("a > div > div.view-end > ul > li:nth-child(1) > span")
            .text()
            .replace(/\s+/g, " "),
          timeRelease: $(e)
            .find("a > div > div.view-end > ul > li:nth-child(2) > span")
            .text()
            .replace(/\s+/g, " "),
          episode: $(e)
            .find("  a > div > div.ep > span:nth-child(2)")
            .text()
            .replace(/Ep\s*\n\s*/, "Ep ")
            .trim(),
          typeList: {
            type1: $(e).find(" div > div > ul > a:first-child").text(),
            type2: $(e).find(" div > div > ul > a:last-child").text(),
          },
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        page: req.query.page || "1",
        scheduled_day: req.query.scheduled_day || "all",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/schedule", getScheeduleAnime);

const getPropertiesAnime = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/properties/genre?genre_type=${req.query.genre_type}&page=1`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div > ul > li");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          genreName: $(e).find(" a > span").text(),
          genreId: $(e)
            .find(" a > span")
            .text()
            .toLowerCase()
            .replace(/\s+/g, "-"),
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        properties: req.query.genre_type || "genre",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/properties", getPropertiesAnime);

// Get Genre Anime
const getPropertiesGenre = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/properties/genre/${
      req.params.genreName
    }?order_by=${req.query.order_by || "ascending"}&page=${
      req.query.page || 1
    }`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          id: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          title: $(e).find("div > h5 > a").text(),
          image: $(e).find("a > div").attr("data-setbg"),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
                .trim()
            : "",
          animeIdSlug: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          ratings: $(e)
            .find(" a > div > div.ep > span")
            .text()
            .replace(/\s+/g, " ")
            .trim(),
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        genreName: req.params.genreName,
        // properties: req.query.genre_type || "genre",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/properties/genre/:genreName", getPropertiesGenre);

const getDetailsAnime = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/anime/${req.params.animeId}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $(
        "body > section > div > div.anime__details__content > div"
      );
      let datas = [];

      const viewer = $(
        "body > section > div > div.anime__details__content > div > div.col-lg-3 > div > div.view-end > ul > li:nth-child(2) > span"
      ).text();
      element.each((i, e) =>
        datas.push({
          type: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(1) > a"
            )
            .text(),
          title: $(e)
            .find(" div.col-lg-9 > div > div.anime__details__title > h3")
            .text(),
          englishTitle: $(e)
            .find("div.col-lg-9 > div > div.anime__details__title > span")
            .text(),
          synopsis: $(e).find("#synopsisField").text(),
          status: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(3) > a"
            )
            .text(),
          image: $(e).find(" div.col-lg-3 > div").attr("data-setbg"),
          ratings: $(e)
            .find(" div.col-lg-3 > div > div.ep")
            .text()
            .replace(/\s+/g, " "),
          animeQuality: $(e).find(" div.col-lg-3 > div > div.ep-v2").text(),
          // comment: $(e)
          //   .find(
          //     "div.col-lg-3 > div > div.view-end > ul > li:nth-child(1) > span"
          //   )
          //   .text(),
          // viewed: viewer,

          totalEps: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(2) > a"
            )
            .text(),
          aired: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul"
            )
            .text()
            .match(/\d{1,2}\s+\w+\s+\d{4}\s+s\/d\s+/)
            ? $(e)
                .find(
                  "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul"
                )
                .text()
                .match(/\d{1,2}\s+\w+\s+\d{4}\s+s\/d\s+/)[0]
                .trim()
            : "?",
          season: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(5) > a"
            )
            .text(),
          duration: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(6) > a"
            )
            .text(),
          country: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(8) > a"
            )
            .text(),
          adaptation: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(1) > ul > li:nth-child(9) > a"
            )
            .text(),
          genres: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(1) > a"
            )
            .text()
            .split(",\n")
            .map((genre) => genre.trim()),
          explisit: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(2) > a"
            )
            .text(),
          demografis: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(3) > a"
            )
            .text()
            .replace(/\s+/g, "" ? "?" : ""),
          theme: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(4) > a"
            )
            .text()
            .replace(/\s+/g, " "),
          skors: $(e)
            .find(
              " div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(6) > a"
            )
            .text(),
          studio: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(5) > a"
            )
            .text()
            .replace(/\s+/g, " "),
          peminat: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(7) > a"
            )
            .text()
            .replace(/\s+/g, " "),
          ratingText: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(8) > a"
            )
            .text()
            .replace(/\s+/g, " "),
          credit: $(e)
            .find(
              "div.col-lg-9 > div > div.anime__details__widget > div > div:nth-child(2) > ul > li:nth-child(9) > a"
            )
            .text()
            .replace(/\s+/g, " "),
          // ratings: $(e).find(" a > div > div.ep > span").text(),
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        genreName: req.params.genreName,
        // properties: req.query.genre_type || "genre",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/details/:animeId", getDetailsAnime);

// Get Search Anime

// Get Genre Anime
const getSearchAnime = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/anime?&search=${req.query.keywq}&order_by=${
      req.query.order_by || "oldest"
    }&page=${req.query.page || 1}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          title: $(e).find("div > h5 > a").text(),
          image: $(e).find("a > div").attr("data-setbg"),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
                .trim()
            : "",
          animeIdSlug: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          ratings: $(e)
            .find(" a > div > div.ep > span")
            .text()
            .replace(/\s+/g, " ")
            .trim(),
          typeList: {
            type1: $(e).find(" div > div > ul > a:first-child").text(),
            type2: $(e).find(" div > div > ul > a:last-child").text(),
          },
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        genreName: req.params.genreName,
        // properties: req.query.genre_type || "genre",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/search", getSearchAnime);

// Get Recent Anime Release
const getRecentRelease = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/properties/season/spring-2023?order_by=${
      req.query.order_by || "popular"
    }`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  request(options, (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      // Mengambil elemen dengan kelas "example"
      const element = $("#animeList > div > div");
      let datas = [];

      element.each((i, e) =>
        datas.push({
          title: $(e).find("div > h5 > a").text(),
          image: $(e).find("a > div").attr("data-setbg"),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
                .trim()
            : "",
          animeIdSlug: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(/^https?:\/\/kuramanime\.net/i, "")
            : "",
          ratings: $(e)
            .find(" a > div > div.ep > span")
            .text()
            .replace(/\s+/g, " ")
            .trim(),
          typeList: {
            type1: $(e).find(" div > div > ul > a:first-child").text(),
            type2: $(e).find(" div > div > ul > a:last-child").text(),
          },
        })
      );

      res.send({
        status: "success",
        statusCode: 200,
        genreName: req.params.genreName,
        // properties: req.query.genre_type || "genre",
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

router.get("/recent", getRecentRelease);

// Get Anime Episode

const getAnimeEpisode = async (req, res) => {
  const options = {
    url: `https://kuramanime.net/anime/${req.params.animeName}/episode/${req.params.episodeId}}`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  const html = await new Promise((resolve, reject) => {
    request(options, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        resolve(html);
      } else {
        reject(error);
      }
    });
  });
  const $ = cheerio.load(html);

  let datas = [];
  $("#animeEpisodes > a").each((i, el) => {
    datas.push({
      episodeText: $(el).text().replace(/\s+/g, " ").trim(),
      animeId: $(el).attr("href")
        ? $(el)
            .attr("href")
            .replace(/^https?:\/\/kuramanime\.net\/anime\/\d+\//i, "")
            .trim()
        : "",
      animeIdSlug: $(el).attr("href")
        ? $(el)
            .attr("href")
            .replace(/^https?:\/\/kuramanime\.net/i, "")
        : "",
    });
  });

  res.status(200).json({
    statusbar: "success",
    data: datas,
  });
};

router.get("/watch/anime/:animeName/:episodeId", getAnimeEpisode);

module.exports = router;
