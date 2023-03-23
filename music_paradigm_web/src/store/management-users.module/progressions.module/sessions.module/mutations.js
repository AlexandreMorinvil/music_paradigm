import { ProgressionSessionsStatus } from '@/modules/progressions'

export default {
	indicateAssigningAdjustments(state, isActive) {
		state.status.isAssigningSessionAdjustments = isActive;
	},

	indicateDeletingTaskStateMarker(state, isActive) {
		state.status.isDeletingTaskStateMarker = isActive;
	},

	indicateResettingSessionTimer(state, isActive) {
		state.status.isResettingSessionTimer = isActive;
	},

	setProgressionSessionsStatus(state, progressionSessionsStatus) {
		state.progressionSessionsStatus = new ProgressionSessionsStatus(progressionSessionsStatus);
	},
};
