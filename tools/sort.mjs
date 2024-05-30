import { promises as fs } from "fs";
import readDajare from "./read.mjs";

const dajare = await readDajare("dajare.json");
let sorted = true;

dajare.tweets.sort((tweetA, tweetB) => {
    if (tweetA.id > tweetB.id) {
        return 1;
    }
    sorted = false;
    return -1;
});

if (!sorted) {
    await fs.writeFile(
        "dajare.json",
        JSON.stringify(dajare, (key, value) => (key == "id" ? value.toString() : value), 4),
        { encoding: "utf-8", flag: "w" }
    );
}
