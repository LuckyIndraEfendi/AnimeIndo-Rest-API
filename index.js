const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 8000;

const otakudesu = require("./routes/otakudesu/otakudesu");
const animeIndo = require("./routes/animeIndo/animeIndo");
const kuramanime = require("./routes/kuramanime/kuramanime");

app.use("/otakudesu", otakudesu);
app.use("/animeindo", animeIndo);
app.use("/kuramanime", kuramanime);

app.get("/", (req, res) => {
  res.send("Welcome To Lucky Anime Rest API");
});
app.listen(port, () => console.log("Server listen on port " + port));
