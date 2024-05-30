import { promises as fs } from "fs";

/**
 * 
 * @param {string} filename 
 * @returns {Promise<{tweets: {date: string, id: bigint, text: string}[]}>}
 */
export default async function readDajare(filename) {
    const text = await fs.readFile(filename, { encoding: "utf-8" });
    return JSON.parse(text, (key, value) => key == "id" ? BigInt(value) : value);
}