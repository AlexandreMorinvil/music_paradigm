import { ProgressionSessionDetailed } from "./progression-session-detailed.class";
import { ProgressionSessionIdentifier } from "./progression-session-identifier.class";

export class Progression {
    constructor(progressionSessionsStatus = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsStatus || {}));

        this.dueSessionIdentifier = this.parseDueSessionIdentifier(parameters.dueSessionIdentifier);
        this.sessionsProgressionDetailedList = this.parseSessionsProgressionDetailedList(
            parameters.sessionsProgressionDetailedList
        );
        this.taskProgressionMarkersList = parameters.taskProgressionMarkersList;
    }

    parseDueSessionIdentifier(dueSessionIdentifier = {}) {
        const { associativeId, associativeIdOrdinalNumber } = dueSessionIdentifier;
        return new ProgressionSessionIdentifier(associativeId, associativeIdOrdinalNumber);
    }

    parseSessionsProgressionDetailedList(sessionsProgressionDetailedList = []) {
        return sessionsProgressionDetailedList.map((sessionsProgressionDetailed) => {
            return new ProgressionSessionDetailed(sessionsProgressionDetailed);
        })
    }
}