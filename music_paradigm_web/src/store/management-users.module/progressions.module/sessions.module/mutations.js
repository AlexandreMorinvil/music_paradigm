import { ProgressionSessionsStatus } from '@/modules/progressions'

export default {
	setProgressionSessionsStatus(state, progressionSessionsStatus) {
		state.progressionSessionsStatus = new ProgressionSessionsStatus(progressionSessionsStatus);
	},
};
