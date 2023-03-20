export default {
	hasSelectedProgressionSession: (_, getters) => {
		return Boolean(getters.selectionProgressionSession.associativeId);
	},

	progressionSessionSelection: (state) => {
		return state.selectionProgressionSession;
	},

	progressionSessionSelectionAssociativeId: (state) => {
		return state.selectionProgressionSession.associativeId;
	},

	progressionSessionSelectionAssociativeIdOrdinalNumber: (state) => {
		return state.selectionProgressionSession.associativeIdOrdinalNumber;
	},
};
