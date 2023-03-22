import { ProgressionSessionsStatus } from '@/modules/progressions'

export default {
	indicateAssigningAdjustments(state) {
		state.status.isAssigningSessionAdjustments = true;
	},

	indicateAssigningAdjustmentsEnd(state) {
		state.status.isAssigningSessionAdjustments = false;
	},

	indicateDeletingTaskStateMarker(state) {
		state.status.isDeletingTaskStateMarker = true;
	},

	indicateDeletingTaskStateMarkerEnd(state) {
		state.status.isDeletingTaskStateMarker = false;
	},

	indicateResettingSessionTimer(state) {
		state.status.isResettingSessionTimer = true;
	},

	indicateResettingSessionTimerEnd(state) {
		state.status.isResettingSessionTimer = false;
	},

	setProgressionSessionsStatus(state, progressionSessionsStatus) {
		state.progressionSessionsStatus = new ProgressionSessionsStatus(progressionSessionsStatus);
	},
};
