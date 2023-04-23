const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require("cors");

axios.default.validateStatus = () => true;
axios.default.headers.common["User-Agent"] =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 Edg/108.0.1462.54";

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("X-Powered-By", "Express");
  next();
});

const otakudesu = require("./routes/otakudesu/otakudesu");
const animeIndo = require("./routes/animeIndo/animeIndo");
const kuramanime = require("./routes/kuramanime/kuramanime");

app.use("/otakudesu", otakudesu);
app.use("/animeindo", animeIndo);
app.use("/kuramanime", kuramanime);

app.get("/", (req, res) => {
  res.send("Welcome To Lucky Anime Rest API");
});
app.listen(PORT, () => console.log("Server listen on port " + PORT));
