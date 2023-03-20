import { ProgressionSessionDetailed } from '@/modules/progressions'

export default {
    setProgressionSessionEdition(state, session) {
		state.editionUserProgression = new ProgressionSessionDetailed(session);
	},

    unsetProgressionSessionEdition(state) {
		state.editionUserProgression = new ProgressionSessionDetailed();
	},
};
