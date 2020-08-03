import config from "@/config";

const staticDirectory = "/static/";
const experimentRessourceDirectory = "/experiment-ressources/";
const users = "/users/";

export default {
    // File serving
    static : function(directory) {
        return config.apiUrl + staticDirectory + directory;
    },
    experimentRessource : function(directory) {
        return config.apiUrl + experimentRessourceDirectory + directory;
    },

    // API calls
    users : function(parameters) {
        return config.apiUrl + users + parameters;
    }
}