const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");
const cors = require('cors');
require('dotenv').config()
const gamesRoutes = require('./routes/games.routes');



require('./database');

const app = express();

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(gamesRoutes)

const url = "https://www.pricecharting.com/search-products?q=";
let names = []


const consoles = [
  "Nintendo DS",
  "Nintendo 64",
  "Nintendo NES",
  "Nintendo Switch",
  "Super Nintendo",
  "Gamecube",
  "Wii",
  "Wii U",
  "Switch",
  "GameBoy",
  "GameBoy Color",
  "GameBoy Advance",
  "Nintendo 3DS",
  "Playstation",
  "Playstation 2",
  "Playstation 3",
  "Playstation 4",
  "Playstation 5",
  "PSP",
  "Playstation Vita",
  "PC Games",
];


app.post('/', async (req, res) => {
  console.log(req.body)
  const game = req.body.gameTitle.trim().replace(/ /g, "+")
  await axios(`${url+game}`).then(
    (res) => {
      const html = res.data;
      const $ = cheerio.load(html);
  
      $(".offer", html).each(function () {
        const title = $(this)
          .find(".product_name")
          .find("a")
          .text()
          .replace(/\n/g, "")
          .trim()
          
        const id = $(this).attr('id').slice(8); //product-123456
        // const url = $(this).find("a").attr("href");
        const img = $(this).find(".photo").find("img").attr("src");
        const system = $(this)
          .find("br")
          .get(0)
          .nextSibling.nodeValue.replace(/\n/g, "")
          .trim();
        
        if (!consoles.includes(system)) return;
        names.push({
          id,
          title,
          img,
          system
        });
      });
  
      console.log(names)
    }
  );
  res.json(names)
  names = []
})


app.listen(process.env.PORT || 4000, () => {
  console.log("App listening on port 4000!");
});
