import { experimentParser, validator } from '@/_helpers';

export default {
	experimentEdited: (state) => {
		return state.edition;
	},

	experimentSelected: (state) => {
		return state.selection.content;
	},

	selectedId: (state) => {
		return state.selection._id;
	},

	experimentsHeadersList: (state) => {
		return state.experimentsHeadersList;
	},

	experimentSelectedParameters: (state) => {
		return experimentParser.getParameterVariables(state.selection.content);
	},

	imposedParameterValues: (state) => {
		return state.imposedParameterValues;
	},

	hasParameterInSelectedExperiment: (state) => {
		return experimentParser.getParameterVariables(state.selection.content).length > 0;
	},

	// Status
	hasExperimentSelection: (state) => {
		return validator.isExperimentValid(state.selection.content);
	},

	hasCompiledEdition: (state) => {
		return validator.isExperimentValid(state.edition);
	},

	isFetchingExperimentHeadersList: (state) => {
		return state.status.isFetchingExperimentHeadersList;
	},
};
