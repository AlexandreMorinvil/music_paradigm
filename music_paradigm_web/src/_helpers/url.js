import config from "@/config";

export default {
    static : function(directory) {
        return config.apiUrl + "/static/" + directory;
    }
}