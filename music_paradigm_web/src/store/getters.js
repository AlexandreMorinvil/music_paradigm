import url from "@/_helpers/url";

export default {
    urlStatic: (state) => (directory) => {
        return url.static(directory);
    }
}