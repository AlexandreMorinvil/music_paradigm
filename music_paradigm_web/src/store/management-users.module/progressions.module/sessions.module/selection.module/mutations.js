import { ProgressionSessionIdentifier } from "@/modules/progressions";

export default {
	setProgressionSessionSelection(state, session) {
		state.selectionProgressionSessionIdentifier = new ProgressionSessionIdentifier(session);
	},

	unsetProgressionSessionSelection(state) {
		state.selectionProgressionSessionIdentifier = new ProgressionSessionIdentifier();
	},

	setSessionCompletionCountSelection(state, coumpletionCount) {
		state.selectionSessionCompletionCount = coumpletionCount;
	},

	unsetSessionCompletionCountSelection(state) {
		state.selectionSessionCompletionCount = null;
	},
};