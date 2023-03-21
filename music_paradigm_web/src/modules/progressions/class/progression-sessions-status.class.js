import { ProgressionSessionDetailed } from "./progression-session-detailed.class";
import { ProgressionSessionIdentifier } from "./progression-session-identifier.class";

export class ProgressionSessionsStatus {
    constructor(progressionSessionsStatus = {}) {
        const parameters = JSON.parse(JSON.stringify(progressionSessionsStatus));

        this.dueSessionIdentifier = new ProgressionSessionIdentifier(parameters.dueSessionIdentifier);
        this.progressionSessionsDetailedList = this.parseProgressionSessionsDetailedList(
            parameters.progressionSessionsDetailedList
        );
        this.taskStateMarkersList = parameters.taskStateMarkersList ?? [];
    }

    parseProgressionSessionsDetailedList(progressionSessionsDetailedList = []) {
        return progressionSessionsDetailedList.map((sessionsProgressionDetailed) => {
            return new ProgressionSessionDetailed(sessionsProgressionDetailed);
        })
    }
}