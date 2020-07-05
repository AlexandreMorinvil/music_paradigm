import url from "@/_helpers/url";

export default {
    urlStatic: () => (directory) => {
        return url.static(directory);
    },
    urlAssets: () => (directory) => {
        return url.assets(directory);
    }
}