import { ProgressionSessionDetailed } from "./progression-session-detailed.class";
import { ProgressionSessionIdentifier } from "./progression-session-identifier.class";

export class ProgressionSessionsStatus {
    constructor(progressionSessionsStatus = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsStatus || {}));

        this.dueSessionIdentifier = this.parseDueSessionIdentifier(parameters.dueSessionIdentifier);
        this.progressionSessionsDetailedList = this.parseProgressionSessionsDetailedList(
            parameters.progressionSessionsDetailedList
        );
        this.taskProgressionMarkersList = parameters.taskProgressionMarkersList;
    }

    parseDueSessionIdentifier(dueSessionIdentifier = {}) {
        const { associativeId, associativeIdOrdinalNumber } = dueSessionIdentifier;
        return new ProgressionSessionIdentifier(associativeId, associativeIdOrdinalNumber);
    }

    parseProgressionSessionsDetailedList(progressionSessionsDetailedList = []) {
        return progressionSessionsDetailedList.map((sessionsProgressionDetailed) => {
            return new ProgressionSessionDetailed(sessionsProgressionDetailed);
        })
    }
}