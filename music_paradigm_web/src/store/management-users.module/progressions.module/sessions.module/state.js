import { ProgressionSessionsStatus } from "@/modules/progressions";

export default {
    status: {
        isAssigningSessionAdjustments: false,
        isDeletingTaskStateMarker: false,
        isResettingSessionTimer: false,
    },
    progressionSessionsStatus: new ProgressionSessionsStatus(),
};
