# AnimeIndo-Rest-API

<p align="center">
  <a href="https://github.com/LuckyIndraEfendi">
    <img src="https://avatars.githubusercontent.com/u/90430786?v=4" alt="Logo" width="150" >
  </a>

  <h3 align="center">AnimeIndo-Rest-API</h3>

  <p align="center">
    <samp>A free anime app restful API serving anime from <a href="http://kyouka-live.web.app/">LuckyAnime</a></samp>
    <br />
    <a href="#routes"><strong>Explore the api »</strong></a>
    <br />
    <br />
    <a href="https://github.com/LuckyIndraEfendi/AnimeIndo-Rest-API/issues/new?assignees=&labels=&projects=&template=bug_report.md&title=Report Problem">Bug report</a>
    ·
    <a href="https://github.com/riimuru/gogoanime/issues/new?assignees=riimuru&labels=enhancement&template=feature-request.md">Feature request</a>
  </p>
  <p align="center">
    <a href="">
      <img src="https://github.com/riimuru/gogoanime/actions/workflows/docker-build.yml/badge.svg" alt="stars">
    </a>
     <a href="https://github.com/riimuru/gogoanime/actions/workflows/codeql-analysis.yml">
      <img src="https://github.com/riimuru/gogoanime/actions/workflows/codeql-analysis.yml/badge.svg" alt="stars">
    </a>
    <a href="https://github.com/LuckyIndraEfendi/AnimeIndo-Rest-API">
      <img src="https://img.shields.io/github/stars/LuckyIndraEfendi/AnimeIndo-Rest-API" alt="stars">
    </a>
    <a href="https://discord.gg/XpWMNdVg">
      <img src="https://img.shields.io/discord/987492554486452315?color=7289da&label=discord&logo=discord&logoColor=7289da" alt="Discord">
    </a>
        <a href="https://github.com/consumet/extensions/blob/master/LICENSE">
      <img src="https://img.shields.io/github/license/consumet/extensions" alt="GitHub">
    </a>
  </p>
</p>

## Project Using This AnimeIndo API
See Project Overview : <a href="https://github.com/LuckyIndraEfendi/KyoukaLive">KyoukaAnime.live</a>

## Installation
Run the following command to clone the repository, and install the dependencies:

```sh
git clone https://github.com/LuckyIndraEfendi/AnimeIndo-Rest-API.git
cd AnimeIndo-Rest-API
npm install #or yarn install
```

### Setup Your `.env` For Custom your PORT
```sh
touch .env
echo "PORT=8000" >> .env
```

### Run Rest-Server with Development Mode
```sh
npm run start
```

Now the Anime-Indo Rest API is running on http://localhost:5000 

## Routes
Below you'll find examples using [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) but you can use any other http library out there. <br/>
Endpoint `https://localhost:5000/luckyanime`


### Get Recent Recent Anime
| Parameter       | Description         |
| --------------- | ------------------- |
| `default-order` |  popular `no-required` |
| `order_by` | order anime  `oldest`, `latest`, `popular`, `ongoing`,`most_viewed`,`updated`,   |


```js
fetch("https://localhost:5000/luckyanime/recent")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
[
{
    "status": "success",
    "statusCode": 200,
    "data": [
        {
            "title": "\"Oshi no Ko\"",
            "image": "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
            "animeId": "/anime/1873/oshi-no-ko",
            "ratings": "9.15",
            "typeList": {
                "type1": "TV",
                "type2": "HD"
            }
        },

    {...},
    ...
]
```

### Get OnGoing Anime

| Parameter       | Description         |
| --------------- | ------------------- |
| `default-page`    | 1         |
| `page` (string)    | anime with page         |

```js
fetch("https://localhost:5000/luckyanime/ongoing?page=2") 
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
{
    "status": "success",
    "statusCode": 200,
    "page": 1,
    "order_by": "latest",
    "data": [
        {
            "title": "Zhen Wu Dianfeng 2nd Season",
            "episodeId": "/anime/1945/zhen-wu-dianfeng-2nd-season/episode/5",
            "image": "https://cdn.myanimelist.net/images/anime/1877/135536l.jpg",
            "episode": "Ep 5 / 52"
        },
        {
            "title": "Zhe Tian",
            "episodeId": "/anime/1942/zhe-tian/episode/5",
            "image": "https://cdn.myanimelist.net/images/anime/1681/121487l.jpg",
            "episode": "Ep 5 / 53"
        },
    {...},
    ...
    ]
}
```

### Get Details Anime

```js
fetch("https://localhost:5000/luckyanime/details/anime/1873/oshi-no-ko")
  .then((response) => response.json())
  .then((result) => console.log(result));
```

Output >>

```json
{
    "status": "success",
    "statusCode": 200,
    "data": [
        {
            "type": "TV",
            "title": "\"Oshi no Ko\"",
            "englishTitle": "[Oshi No Ko], 【推しの子】, My Star",
            "synopsis": "Ai Hoshino yang berusia enam belas tahun adalah idola berbakat dan cantik yang dipuja oleh para penggemarnya. Dia adalah personifikasi dari gadis muda yang murni.Tapi semua yang berkilau itu bukanlah emas.\nGorou Amemiya adalah seorang ginekolog pedesaan dan penggemar berat Ai. Jadi ketika idola yang sedang hamil itu muncul di rumah sakitnya, dia sangat bingung.Gorou menjanjikannya pengiriman yang aman. Sedikit yang dia tahu, pertemuan dengan sosok misterius akan mengakibatkan kematiannya sebelum waktunya — atau begitulah yang dia pikirkan.\nMembuka matanya di pangkuan idola kesayangannya, Gorou menemukan bahwa dia telah terlahir kembali sebagai Aquamarine Hoshino—putra Ai yang baru lahir! Dengan dunianya yang terbalik, Gorou segera mengetahui bahwa dunia showbiz diaspal dengan duri, di mana bakat tidak selalu menghasilkan kesuksesan.Akankah dia berhasil melindungi senyum Ai yang sangat dia cintai dengan bantuan sekutu yang eksentrik dan tak terduga?\n[Ditulis oleh MAL Tulis Ulang]Catatan: Sinopsis diterjemahkan secara otomatis oleh Google Translate.",
            "status": "Sedang Tayang",
            "image": "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
            "ratings": "",
            "animeQuality": "HD",
            "totalEps": "11",
            "aired": "12 Apr 2023 s/d",
            "season": "Spring 2023",
            "duration": "24 menit per ep",
            "country": "JP",
            "adaptation": "Manga",
            "genres": [
                "Drama",
                "Supernatural"
            ],
            "explisit": "",
            "demografis": "Seinen",
            "theme": " Reincarnation, Showbiz ",
            "skors": "9.15 / 10.00",
            "studio": " Doga Kobo ",
            "peminat": "357,169 orang",
            "ratingText": "PG-13 - Remaja berusia 13 tahun ke atas",
            "credit": " Doro ",
            "episode": [
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/1",
                    "epsTitle": " Ep 1 "
                },
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/2",
                    "epsTitle": " Ep 2 "
                },
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/3",
                    "epsTitle": " Ep 3 "
                },
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/4",
                    "epsTitle": " Ep 4 "
                },
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/5",
                    "epsTitle": " Ep 5 "
                },
                {
                    "episodeId": "/anime/1873/oshi-no-ko/episode/6",
                    "epsTitle": " Ep 6 "
                }
            ]
        }
    ]
}
```

### Get Anime Search

| Parameter       | Description         |
| --------------- | ------------------- |
| `default-order` |  latest             |
| `keywq` (string)    | anime title         |
| `order_by` (string)    | order anime : `oldest`, `latest`, `popular`, `ongoing`,`most_viewed`,`updated`,         |


```js
fetch("http://localhost:5000/luckyanime/search?keywq=oshi")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
    "status": "success",
    "statusCode": 200,
    "data": [
        {
            "title": "\"Oshi no Ko\"",
            "image": "https://cdn.myanimelist.net/images/anime/1812/134736l.jpg",
            "animeId": "/anime/1873/oshi-no-ko",
            "ratings": "9.15",
            "typeList": {
                "type1": "TV",
                "type2": "HD"
            }
        },
    {...},
    ...
]
```


### Get Anime Schedule

| Parameter       | Description         |
| --------------- | ------------------- |
| `default-schedule_day` | all days `all`      |
| `default-page` | page : `1`      |
| `schedule_day` (string)    | query : `monday`, `tuesday`,`wednesday`,`thursday`, `friday`, `saturday`, `sunday`,       |
| `page` (string)    | anime schedule page : `1`, `2`, `3`         |

 Example All Response : `http://localhost:5000/luckyanime/schedule?scheduled_day=sunday&page=1`

```js
fetch("http://localhost:5000/luckyanime/schedule")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
    "status": "success",
    "statusCode": 200,
    "page": "1",
    "scheduled_day": "sunday",
    "data": [
        {
            "title": "Maou Gakuin no Futekigousha: Shijou Saikyou no Maou no Shiso, Tensei shite Shison-tachi no Gakkou e Kayou II",
            "image": "https://cdn.myanimelist.net/images/anime/1471/128323l.jpg",
            "animeId": "/anime/1657/maou-gakuin-no-futekigousha-shijou-saikyou-no-maou-no-shiso-tensei-shite-shison-tachi-no-gakkou-e-kayou-ii",
            "days": " Minggu ",
            "timeRelease": " 00:29 WIB ",
            "episode": "Selanjutnya: Ep 7",
            "typeList": {
                "type1": "TV",
                "type2": "HD"
            }
        },
        {
            "title": "Edens Zero 2nd Season",
            "image": "https://cdn.myanimelist.net/images/anime/1687/133670l.jpg",
            "animeId": "/anime/1880/edens-zero-2nd-season",
            "days": " Minggu ",
            "timeRelease": " 00:31 WIB ",
            "episode": "Selanjutnya: Ep 9",
            "typeList": {
                "type1": "TV",
                "type2": "HD"
            }
        },
    {...},
    ...
]
```


### Get Properties Anime  Genre

```js
fetch("http://localhost:5000/luckyanime/properties")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
    "status": "success",
    "statusCode": 200,
    "properties": "genre",
    "data": [
        {
            "genreName": "Action",
            "genreId": "action"
        },
        {
            "genreName": "Adult Cast",
            "genreId": "adult-cast"
        },
        {
            "genreName": "Adventure",
            "genreId": "adventure"
        },
    {...},
    ...
]
```


### Get Properties Anime  Genre Name

| Parameter       | Description         |
| --------------- | ------------------- |
| `default-order_by` | all days `ascending`      |
| `default-page` | page : `1`      |
| `order_by` (string)    | properties anime : `ascending`, `descending`,`oldest`,`latest`, `popular`, `most_viewed`, `updated`      |
| `page` (string)    | anime schedule page : `1`, `2`, `3`         |


Example All Response : `http://localhost:5000/luckyanime/properties/genre/fantasy?order_by =oldest&page=2` 

```js
fetch("http://localhost:5000/luckyanime/properties/genre/fantasy")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
    "status": "success",
    "statusCode": 200,
    "genreName": "fantasy",
    "data": [
        {
            "title": "100-man no Inochi no Ue ni Ore wa Tatteiru",
            "image": "https://cdn.myanimelist.net/images/anime/1506/117717l.jpg",
            "animeId": "/anime/154/100-man-no-inochi-no-ue-ni-ore-wa-tatteiru",
            "ratings": "6.50"
        },
        {
            "title": "5-fun de Wakaru: Boku no Hero Academia",
            "image": "https://cdn.myanimelist.net/images/anime/1366/127600l.jpg",
            "animeId": "/anime/1360/5-fun-de-wakaru-boku-no-hero-academia",
            "ratings": "5.88"
        },
    {...},
    ...
]
```

### Get Watch Anime Streaming

## You Can Get Watch Anime Id From Details `Response` or Recent `Episode`

```js
fetch("http://localhost:5000/luckyanime/watch/anime/1873/oshi-no-ko/episode/1")
  .then((response) => response.json())
  .then((animelist) => console.log(animelist));
```

Output >>

```json
[
   "statusbar": "success",
    "data": [
        {
            "episodeText": "Ep 1",
            "episodeId": "/anime/1873/oshi-no-ko/episode/1"
        },
        {
            "episodeText": "Ep 2",
            "episodeId": "/anime/1873/oshi-no-ko/episode/2"
        },
        {
            "episodeText": "Ep 3",
            "episodeId": "/anime/1873/oshi-no-ko/episode/3"
        },
        {
            "episodeText": "Ep 4",
            "episodeId": "/anime/1873/oshi-no-ko/episode/4"
        },
        {
            "episodeText": "Ep 5",
            "episodeId": "/anime/1873/oshi-no-ko/episode/5"
        },
        {
            "episodeText": "Ep 6",
            "episodeId": "/anime/1873/oshi-no-ko/episode/6"
        }
    ],
    "isActive": "active-ep ep-button",
    "episodeActive": "Ep 1",
    "episodeUrl": [
        {
            "episode": "https://liscia.my.id/0:/KOI%20KISAMA/OSHIKO/1/MP4/Kuramanime-OSHIKO-01-720p-Doro.mp4",
            "type": "video/mp4",
            "size": "720"
        },
        {
            "episode": "https://liscia.my.id/0:/KOI%20KISAMA/OSHIKO/1/MP4/Kuramanime-OSHIKO-01-480p-Doro.mp4",
            "type": "video/mp4",
            "size": "480"
        },
        {
            "episode": "https://liscia.my.id/0:/KOI%20KISAMA/OSHIKO/1/MP4/Kuramanime-OSHIKO-01-360p-Doro.mp4",
            "type": "video/mp4",
            "size": "360"
        }
    ]
]
```

### Heroku
Host your own instance of the api on heroku using the button below.

[![Deploy on Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/LuckyIndraEfendi/AnimeIndo-Rest-API/tree/main)

### Render
Host your own instance of the api on render using the button below.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/LuckyIndraEfendi/AnimeIndo-Rest-API)

### Railway
Host your own instance of the api on railway using the button below.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template/Lg6DEp?referralCode=dv4TuD)


