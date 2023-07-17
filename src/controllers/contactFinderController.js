import fs from 'fs';

import contactFinderService from "../services/contactFinderService.js"
import readline from 'readline';
import neatCsv from 'neat-csv';

export default {
    async infoFinder (req, res) {
        const result = await contactFinderService.infoFinder(req.body.url);

        res.status(200).json(result)
    },
    async findInfoInManyURLs (req, res) {
        const links = await Promise.all(req.body.urlList.map(async (url) => {
            return contactFinderService.infoFinder(url);
        }))

        res.status(200).json(links)
    },
    async findInfoInManyURLsProvidedByTxt (req, res) {
        const fileStream = fs.createReadStream(req.file.path);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity
          });

        let result = [];
        for await (const line of rl) {
            result.push(await contactFinderService.infoFinder(line));
        }

        res.status(200).json(result)
    },
    async findInfoInManyURLsProvidedByCSV (req, res) {
        const fileStream = fs.createReadStream(req.file.path);
        const links = await neatCsv(fileStream)

        const result = await Promise.all(links.map(async (url) => {
            return contactFinderService.infoFinder(url.urls);
        }))

        res.status(200).json(result)
    },
}