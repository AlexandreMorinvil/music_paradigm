export default {
	editProgressionSessionEditionAdjustmentAdditionalCompletionsRequired({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentAdditionalCompletionsRequired', value);
	},

	editProgressionSessionEditionAdjustmentBlockAvailability({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentBlockAvailability', value);
	},

	editProgressionSessionEditionAdjustmentConsiderCompleted({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentConsiderCompleted', value);
	},

	editProgressionSessionEditionAdjustmentDelayInDays({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentDelayInDays', value);
	},

	editProgressionSessionEditionAdjustmentImposeReadyToBeDone({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentImposeReadyToBeDone', value);
	},

	editProgressionSessionEditionAdjustmentOverlookUniqueInDays({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentOverlookUniqueInDays', value);
	},

	editProgressionSessionEditionAdjustmentPreponeAvailability({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentPreponeAvailability', value);
	},

	editProgressionSessionEditionAdjustmentRemoveCompletionLimit({ commit }, value) {
		commit('editProgressionSessionEditionAdjustmentRemoveCompletionLimit', value);
	},
	
	setProgressionSessionEdition({ commit }, session) {
		commit('setProgressionSessionEdition', session);
	},

	unsetProgressionSessionEdition({ commit }) {
		commit('setProgressionSessionEdition');
	},
};
