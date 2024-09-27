

export class PreloaderStorage {

    constructor() {
        this.urlToObectUrlMap = {};
    }

    addFile(url, objectUrl) {
        this.urlToObectUrlMap[url] = objectUrl;
    }

    hasFile(url) {
        return Object.prototype.hasOwnProperty.call(this.urlToObectUrlMap, url);
    }

    purgeStorage() {
        this.urlToObectUrlMap = {};
    }

    retrieveObectUrl(url) {
        return this.urlToObectUrlMap[url] ?? url;
    }

    removeUnspecifiedUrl(urlList = []) {
        const storedUrls = Object.keys(this.urlToObectUrlMap);

        // Remove the stored file if its reference is not in the list of urls
        for (const url of storedUrls) {
            if (urlList.includes(url))
                continue;

            URL.revokeObjectURL(this.urlToObectUrlMap[url]);
            delete this.urlToObectUrlMap[url];
        }
    }

    clear() {
        this.removeUnspecifiedUrl([]);
    }
}