import config from "@/config";

const staticDir = "/static/";
const assetsDir = staticDir + "assets/";

export default {
    static : function(directory) {
        return config.apiUrl + staticDir + directory;
    },
    assets : function(directory) {
        return config.apiUrl + assetsDir + directory;
    }
}