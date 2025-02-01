import { promises as fs } from "fs";
import readDajare from "./read.mjs";

if (!process.argv[2]) {
    console.log("使用法: node ./tools/add.mjs <ツイートID>");
    process.exit(1);
}

const dajare = await readDajare("dajare.json");

if (dajare.tweets.some(tweet => tweet.id === process.argv[2])) {
    console.log("既に追加されています。");
    process.exit(0);
}

const tweet = await fetch("https://cdn.syndication.twimg.com/tweet-result?id=" + process.argv[2] + "&token=" + (Math.random() * 1000).toFixed()).then(response => response.json());

if (tweet.user.id_str !== "1240697765740441600") {
    console.log("これはゆいのツイートではありません。");
    process.exit(1);
}

dajare.tweets.push({
    date: new Date(
        new Date(tweet.created_at).getTime() + 9 * 60 * 60 * 1000
    ).toISOString().slice(0, 10),
    id: tweet.id_str,
    text: tweet.text,
});

await fs.writeFile(
    "dajare.json",
    JSON.stringify(dajare, (key, value) => (key == "id" ? value.toString() : value), 4),
    { encoding: "utf-8", flag: "w" }
);
