const express = require("express");
const axios = require("axios");
const puppeteer = require("puppeteer");

const request = require("request");
const cheerio = require("cheerio");

module_exports = {
  getOngoingAnime: async (req, res) => {
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
  },
};
