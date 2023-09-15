const express = require("express");
const app = express();
const axios = require("axios");
const port = process.env.PORT || 5000;
const cors = require("cors");

const otakudesu = require("./routes/otakudesu/otakudesu");
const animeIndo = require("./routes/animeIndo/animeIndo");
const kuramanime = require("./routes/kuramanime/kuramanime");

const corsOptions = {
  origin: "*", // Ganti dengan URL frontend Anda
  credentials: true, // Mengizinkan pengiriman cookie melalui CORS
};

app.use(cors(corsOptions));
// app.use("/otakudesu", otakudesu);
app.use("/animeindo", animeIndo);
app.use("/luckyanime", kuramanime);

app.get("/", (req, res) => {
  res.send("Welcome To Lucky Anime Rest API");
});
app.listen(port, () => console.log("Server listen on port " + port));
