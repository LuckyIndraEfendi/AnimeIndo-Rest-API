const axios = require("axios");

const request = require("request");
const cheerio = require("cheerio");
const baseURL = "https://kuramanime.art"
const getOngoingAnime = async (req, res) => {
  const options = {
    url: `${baseURL}/anime/ongoing?order_by=${
      req.query.order_by || "latest"
    }&page=${req.query.page || 1}`,
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
                .replace(/^https?:\/\/kuramanime\.top/i, "")
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

const getScheeduleAnime = async (req, res) => {
  const options = {
    url: `${baseURL}/schedule?scheduled_day=${
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
                .replace(`${baseURL}`, "")
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

const getPropertiesAnime = async (req, res) => {
  const options = {
    url: `${baseURL}/properties/genre?genre_type=${req.query.genre_type}&page=1`,
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

const getPropertiesGenre = async (req, res) => {
  const options = {
    url: `${baseURL}/properties/genre/${
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
          title: $(e).find("div > h5 > a").text(),
          image: $(e).find("a > div").attr("data-setbg"),
          animeId: $(e).find("div > h5 > a").attr("href")
            ? $(e)
                .find("div > h5 > a")
                .attr("href")
                .replace(`${baseURL}`, "")
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

const getDetailsAnime = async (req, res) => {
  const options = {
    url: `${baseURL}/anime/${req.params.animeId}/${req.params.animeIdTitle}`,
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
      let episode = $("#episodeLists").attr("data-content");
      const $$ = cheerio.load(episode);

      let episodeArray = [];
      $$("a").each((i, e) => {
        const eps = $(e)
          .attr("href")
          .trim()
          .replace(`${baseURL}`, "");
        const epsTitle = $(e).text().replace(/\s+/g, " ");
        episodeArray.push({
          episodeId: eps,
          epsTitle: epsTitle,
        });
      });

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
          episode: episodeArray,
          ratings: $(e).find(" a > div > div.ep > span").text(),
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

const getSearchAnime = async (req, res) => {
  const options = {
    url: `${baseURL}/anime?&search=${req.query.keywq}&order_by=${
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
                .replace(/^https?:\/\/kuramanime\.top/i, "")
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
        data: datas,
      });
    } else {
      console.log("Terjadi kesalahan saat mengambil data.");
    }
  });
};

const getRecentRelease = async (req, res) => {
  const options = {
    url: `${baseURL}/properties/season/spring-2023?order_by=${
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
                .replace(`${baseURL}`, "")
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

const getAnimeEpisode = (req, res) => {
  const options = {
    url: `${baseURL}/anime/${req.params.animeName}/${req.params.animeId}/episode/${req.params.episodeId}?activate_stream=1`,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54",
      "Accept-Language": "en-US,en;q=0.9",
    },
  };

  axios
    .get(options.url, { headers: options.headers })
    .then((response) => {
      const $ = cheerio.load(response.data);

      let datas = [];
      let videoSource = []; // Undefined or empty

      $("#player")
        .find("source")
        .each((i, el) => {
          videoSource.push({
            episode: $(el).attr("src"),
            type: $(el).attr("type"),
            size: $(el).attr("size"),
          });
        });

      $("#animeEpisodes > a").each((i, el) => {
        datas.push({
          episodeText: $(el).text().replace(/\s+/g, " ").trim(),
          episodeId: $(el).attr("href")
            ? $(el)
                .attr("href")
                .replace(`${baseURL}`, "")
            : "",
        });
      });

      res.status(200).json({
        statusbar: "success",
        data: datas,
        isActive: $("#animeEpisodes > a.active-ep.ep-button").attr("class"),
        episodeActive: $("#animeEpisodes > a.active-ep.ep-button")
          .text()
          .match(/\d+/)[0],
        episodeUrl: videoSource,
      });
    })
    .catch((error) => {
      res.status(500).json({
        statusbar: "error",
        message: error.message,
      });
    });
};
module.exports = {
  getOngoingAnime,
  getScheeduleAnime,
  getPropertiesAnime,
  getPropertiesGenre,
  getDetailsAnime,
  getSearchAnime,
  getRecentRelease,
  getAnimeEpisode,
};
