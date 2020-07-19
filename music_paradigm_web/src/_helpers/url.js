import config from "@/config";

const staticDirectory = "/static/";
const experimentRessourceDirectory = "/experiment-ressources/";

export default {
    static : function(directory) {
        return config.apiUrl + staticDirectory + directory;
    },
    experimentRessource : function(directory) {
        return config.apiUrl + experimentRessourceDirectory + directory;
    }
}