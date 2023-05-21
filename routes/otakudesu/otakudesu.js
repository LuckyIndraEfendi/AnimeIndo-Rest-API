const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router();

router.get('/', (req,res)=>{
  res.send('Otakudesu Server is Ready')
})

const getRecentEpisode = async (req, res) => {
  try {
    const { page } = req.params;
    const url = await axios.get("https://otakudesu.su/?page=" + page || 1);
    const $ = await cheerio.load(url.data);
    console.log(page);
    const animeList = [];

    $(
      "#content > div > div.postbody > div > div.listupd.normal > div.excstf > article"
    ).each((i, e) => {
      animeList.push({
        type: $(e).find("#subbtn").text().replace(/\s/g, ""),
        animeId: $(e)
          .find("div > a > div.limit > img")
          .attr("alt")
          .replace(/[:–—]+|[^a-zA-Z0-9]+/g, '-').toLowerCase(),
        title: $(e).find("div > a > div.limit > img").attr("alt"),
        episode: $(e).find("div > a > div.limit >  div.bt > span.epx").text(),
        episodeURL: $(e).find("div > a > div.limit > img").attr("src"),
        image: $(e).find("div > a > div.limit > img").attr("alt").replace(/[:–—]+|[^a-zA-Z0-9]+/g, '-').toLowerCase(),
      });
    });

    res.status(200).json({
      status: "success",
      data: animeList,
    });
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
router.get("/recent/:page", getRecentEpisode);

const getTopAnime = async (req, res) => {
  try {
    const url = await axios.get(
      "https://otakudesu.su/anime?status=&type=&order=popular"
    );
    const $ = await cheerio.load(url.data);
    const popular = [];

    $(
      "#content > div > div.postbody > div > div.mrgn > div.listupd > article"
    ).each((i, e) => {
      popular.push({
        type: $(e)
          .find("div > a > div.limit > div.bt > span.sb.Sub")
          .text()
          .replace(/\s/g, ""),
        animeId: $(e)
        .find(" div > a > div.tt > h2")
        .text()
        .replace(/[:–—]+|[^a-zA-Z0-9]+/g, '-').toLowerCase(),
        title: $(e).find("div > a > div.limit > img").attr("alt"),
        status: $(e).find("div > a > div.limit >  div.bt > span.epx").text(),
        image: $(e).find(" div > a > div.limit > img").attr("src"),
      });
    });

    res.status(200).json({
      status: "success",
      data: popular,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

router.get("popular", getTopAnime);

const getGenreAnime = async (req, res) => {
  try {
    const url = await axios.get("https://otakudesu.su/genres");
    const $ = await cheerio.load(url.data);
    const genres = [];

    $("#content > div > div.postbody > div > div.page > ul > li").each(
      (i, e) => {
        genres.push({
          name: $(e).find(" a > span.name").text().replace(/\s/g, ""),
          count: $(e).find(" a > span.count").text(),
          genreId: $(e)
            .find(" a > span.name")
            .text()
            .replace(/\s/g, "")
            .toLocaleLowerCase(),
        });
      }
    );

    res.status(200).json({
      status: "success",
      data: genres,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

router.get("genre", getGenreAnime);

const getGenreAnimeSearch = async (req, res) => {
  try {
    const url = await axios.get(
      "https://otakudesu.su/genres/" + req.params.name
    );
    const $ = await cheerio.load(url.data);
    const genres = [];

    $("#content > div > div.postbody > div > div.listupd > article").each(
      (i, e) => {
        genres.push({
          type: $(e)
            .find("div > a > div.limit > div.typez.TV")
            .text()
            .replace(/\s/g, ""),
          animeId: $(e)
            .find("div > a > div.tt > h2")
            .text()
            .replace(/[:–—]+|[^a-zA-Z0-9]+/g, '-').toLowerCase(),
          title: $(e).find("div > a > div.limit > img").attr("alt"),
          status: $(e).find("div > a > div.limit > div.bt > span.epx").text(),
          image: $(e).find(" div > a > div.limit > img").attr("src"),
        });
      }
    );

    res.status(200).json({
      status: "success",
      data: genres,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

router.get("/genre/:name", getGenreAnimeSearch);

const getAnimeDetails = async (req, res) => {
  try {
    const url = await axios.get(
      "https://otakudesu.su/anime/" + req.params.animeId
    );
    const $ = await cheerio.load(url.data);


    let text = $("div.infox > div.ninfo > div > div.spe > span:nth-child(5)").text() 
   
    
    let released = $("div.infox > div.ninfo > div > div.spe > span.split")
    .text()
    .match(/Released\s*:\s*(\d{4})/i)[1] || "";

    let type = $("div.infox > div.ninfo > div > div.spe > span:nth-child(6)").text().replace(/Type:/i, "")
    let episodeURL = []
    
    $("#post-464 > div.bixbox.bxcl.epcheck > div.num > li").each((i,el)=>{
      episodeURL.push({
        episode : $(el).find("a").attr('href'),
      })
    })
    res.status(200).json({
      status: "success",
      data: [{
        type: type ? "TV" : $("div.infox > div.ninfo > div > div.spe > span:nth-child(5)").text().replace(/Type:/i, ""),
        title: $("div.infox > h1").text(),
        synopsis: $("div.infox > div.ninfo > div > div.entry-content > p").text(),
        image: $("div.thumbook > div.thumb > img").attr("src"),
        status: $(" div.infox > div.ninfo > div > div.spe > span:nth-child(1)").text().replace(/Status:/i, ""),
        studio: $("div.infox > div.ninfo > div > div.spe > span:nth-child(2) > a").text(),
        released: released,
        genres : $("div.infox > div.ninfo > div > div.genxed > a").text().split(/(?=[A-Z])/),
        season: $("div.infox > div.ninfo > div > div.spe > span:nth-child(5) > a").text(),
        episodeList : [{
          link : $('#post-464 > div.bixbox.bxcl.epcheck > div.num > li:nth-child(2) > a:nth-child(2)').text(),
        }]
      }],
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};

router.get("/details/:animeId", getAnimeDetails);

// router.get("/popular", getTopAnime);

module.exports = router;
