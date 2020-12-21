import{ validator } from'@/_helpers';

export default{
	experimentEdited: (state) => {
		return state.edition;
	},

	experimentSelected: (state) => {
		return state.selection.content;
	},

	selectedId: (state)=> {
		return state.selection._id;
	},

	experimentsHeadersList: (state) => {
		return state.experimentsHeadersList;
	},

	// Status
	hasCompiledEdition: (state) => {
		return validator.isExperimentValid(state.edition);
	},

	isFetchingExperimentHeadersList: (state) => {
		return state.status.isFetchingExperimentHeadersList;
	}
};
