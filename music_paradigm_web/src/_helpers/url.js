import config from "@/config";

const staticDirectory = "/static/";
const experimentRessourceDirectory = "/experiment-ressources/";

// 
const users = "/users/";
const experiments = "/experiments/";

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
    },
    experiments : function(parameters) {
        return config.apiUrl + experiments + parameters;
    }
}