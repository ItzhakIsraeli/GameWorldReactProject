import * as cheerio from 'cheerio';
import axios from "axios";

// URL of the page we want to scrape
const url = "https://www.metacritic.com/browse/games/score/metascore/all/all/filtered";

export async function scrapeData() {
    try {
        const {data} = await axios.get(url);
        const $ = cheerio.load(data);
        const summeryList = $(".clamp-summary-wrap");
        const imagesList = $(".clamp-image-wrap");
        const games: any = [];

        summeryList.each((idx, el) => {
            const game: any = {};
            game.name = $(el).children("a").children("h3").text().trim();
            game.rate = $(el).children(".clamp-score-wrap").text().trim()
            game.userRate = $(el).children(".browse-score-clamp").children(".clamp-userscore").children("a").text().trim();
            game.platform = $(el).children(".clamp-details").children(".platform").children(".data").text().trim();
            game.releaseDate = $(el).children(".clamp-details").text().trim().split("\n")[7].trim();
            game.description = $(el).children(".summary").text().trim();
            game.price = Math.floor(game.rate * game.userRate * 0.25);
            game.limit = 40;

            games.push(game);
        });

        imagesList.each((idx, el) => {
            games[idx].image = $(el)?.children("a")?.children("img")?.attr()?.src;
        })

        // console.log(games);
        return games;
    } catch (err) {
        console.error(err);
    }
}