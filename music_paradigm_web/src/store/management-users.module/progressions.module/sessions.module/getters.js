import { ProgressionSessionIdentifier } from "@/modules/progressions";

export default {
	hasProgressionSessionsLinkedForSession: (_, getters) => (session) => {
		return getters.progressionSessionsLinkedForSession(session).length > 1;
	},

	isDeletingTaskStateMarker: (state) => {
		return state.status.isDeletingTaskStateMarker;
	},

	isExecutingProgressionSessionCommand: (_, getters) => {
		return getters.isDeletingTaskStateMarker ||
			getters.isResettingSessionTimer;
	},

	isResettingSessionTimer: (state) => {
		return state.status.isResettingSessionTimer;
	},

	progressionSessionsDetailedList: (state) => {
		return state.progressionSessionsStatus.progressionSessionsDetailedList;
	},

	progressionSessionsLinkedForSession: (_, getters) => (session) => {
		return getters.progressionSessionsDetailedList.filter((progressionSession) => {
			return ProgressionSessionIdentifier.isLinked(session, progressionSession);
		});
	},

	progressionSessionsTaskStateMarkerForSession: (_, getters) => (session) => {
		return getters.progressionSessionsTaskStateMarkersList.find((taskStateMarker) => {
			return ProgressionSessionIdentifier.isLinked(session, taskStateMarker);
		}) ?? {}; // TODO: Replace the empty object by an instance of the class TaskProgressionMaker when it is created
	},

	progressionSessionsTaskStateMarkersList: (state) => {
		return state.progressionSessionsStatus.taskStateMarkersList;
	},
};
