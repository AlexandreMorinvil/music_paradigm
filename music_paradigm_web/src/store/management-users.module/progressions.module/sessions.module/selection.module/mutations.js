import { ProgressionSessionDetailed } from "@/modules/progressions";

export default {
	setProgressionSessionSelection(state, session) {
		state.selectionProgressionSession = new ProgressionSessionDetailed(session);
	},

	unsetProgressionSessionSelection(state) {
		state.selectionProgressionSession = new ProgressionSessionDetailed();
	},
};