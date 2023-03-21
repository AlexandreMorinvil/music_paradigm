import { ProgressionSessionsStatus } from "@/modules/progressions";

export default {
    status: {
        isDeletingTaskStateMarker: false,
        isResettingSessionTimer: false,
    },
    progressionSessionsStatus: new ProgressionSessionsStatus(),
};
