import readDajare from "./read.mjs";

const dajare = await readDajare("dajare.json");
for (const tweet of dajare.tweets) {
    console.log(tweet.text.replaceAll("\n", "⏎"));
}