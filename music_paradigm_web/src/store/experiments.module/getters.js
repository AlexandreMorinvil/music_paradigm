import { experimentParser, validator } from '@/_helpers';

export default {
	experimentEdited: (state) => {
		return state.edition;
	},

	experimentSelected: (state) => {
		return state.selection.content;
	},

	experimentSelectedToRun: (state) => {
		const experiment = JSON.parse(JSON.stringify(state.selection.content));
		experiment._id = state.selection._id;
		return experiment;
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

	logType: (state) => {
		return state.logType;
	},

	imposedTags: (state) => {
		return state.imposedTags;
	},

	hasParameterInSelectedExperiment: (state) => {
		return experimentParser.getParameterVariables(state.selection.content).length > 0;
	},

	experimentsSelectedGroup: (state) => {
		return state.selection.content.group;
	},

	experimentsSelectedName: (state) => {
		return state.selection.content.name;
	},

	experimentsSelectedVersion: (state) => {
		return state.selection.content.version;
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
