import axios from "axios";
import { load } from 'cheerio'

export default {
    async infoFinder(url) {
        const data = await axios.get(url)
            .then(result => {
                return result
            })
            .catch(err => {
                throw Error(err)
            });

        const $ = load(data.data);
        const listLinks = $('a');

        let links = [];
        listLinks.each(function(index, value) {
            if($(this).attr("href") !== undefined)
                links[index] = $(this).attr("href")
        });

        let domain = (new URL(url));
        const linksExtracted = {
            [domain.host]: {
                instagram: links.filter(function (item) { return item.includes('instagram.com'); }),
                twitter: links.filter(function (item) { return item.includes('twitter.com'); }),
                youtube: links.filter(function (item) { return item.includes('youtube.com'); }),
                linkedin: links.filter(function (item) { return item.includes('linkedin.com'); }),
                facebook: links.filter(function (item) { return item.includes('facebook.com'); }),
                pinterest: links.filter(function (item) { return item.includes('pinterest.com'); }),
                tiktok: links.filter(function (item) { return item.includes('tiktok.com'); })
            }
        }

        return linksExtracted;
    }
}