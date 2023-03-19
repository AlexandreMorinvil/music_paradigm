const ProgressionSessionDetailed = require("./progression-session-detailed.class");
const ProgressionSessionIdentifier = require("./progression-session-identifier.class");

module.exports  = class ProgressionSessionsStatus {
    constructor(progressionSessionsStatus = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsStatus || {}));

        this.dueSessionIdentifier = this.parseDueSessionIdentifier(parameters.dueSessionIdentifier);
        this.progressionSessionsDetailedList = this.parseSessionsProgressionDetailedList(
            parameters.progressionSessionsDetailedList
        );
        this.taskStateMarkersList = parameters.taskStateMarkersList;

        // TODO: Delete these elements once the code will have been adjusted
        this.history = this.progressionSessionsDetailedList; 
        this.markers = this.taskStateMarkersList; 
        this.dueExperiment = this.dueSessionIdentifier; 
    }

    parseDueSessionIdentifier(dueSessionIdentifier = {}) {
        const { associativeId, associativeIdOrdinalNumber } = dueSessionIdentifier;
        return new ProgressionSessionIdentifier(associativeId, associativeIdOrdinalNumber);
    }

    parseSessionsProgressionDetailedList(progressionSessionsDetailedList = []) {
        return progressionSessionsDetailedList.map((sessionsProgressionDetailed) => {
            return new ProgressionSessionDetailed(sessionsProgressionDetailed);
        })
    }
}