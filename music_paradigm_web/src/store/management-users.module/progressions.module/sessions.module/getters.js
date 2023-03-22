import { ProgressionSessionIdentifier } from "@/modules/progressions";
import _isEqual from 'lodash/isEqual';
import _omitBy from 'lodash/omitBy';

export default {
	hasEditedProgressionSessionAdjustments: (_, getters) => {
		return !_isEqual(
			_omitBy(getters['selection/progressionSessionSelectionAdjustments']),
			_omitBy(getters['edition/progressionSessionEditionAdjustments']),
		);
	},

	hasProgressionSessionsLinkedForSession: (_, getters) => (session) => {
		return getters.progressionSessionsLinkedForSession(session).length > 1;
	},

	isAssigningSessionAdjustments: (state) => {
		return state.status.isAssigningSessionAdjustments;
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
