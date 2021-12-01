import { defaultState } from '@/store-helper/experiments.module-helper';

export default {
	// Status Updates
	indicateFetchingExperimentList(state) {
		state.status.isFetchingExperimentHeadersList = true;
	},

	indicateFetchingExperimentListEnd(state) {
		state.status.isFetchingExperimentHeadersList = false;
	},

	indicateCreateRequest(state) {
		state.status.isCreating = true;
	},

	indicateCreateRequestEnd(state) {
		state.status.isCreating = false;
	},

	indicateUpdateRequest(state) {
		state.status.isUpdating = true;
	},

	indicateUpdateRequestEnd(state) {
		state.status.isUpdating = false;
	},

	indicateDeleteRequest(state) {
		state.status.isDeleting = true;
	},

	indicateDeleteRequestEnd(state) {
		state.status.isDeleting = false;
	},

	indicateHasCompiledEdition(state) {
		state.status.hasCompiledEdition = true;
	},

	indicateHasNoCompiledEdition(state) {
		state.status.hasCompiledEdition = false;
	},

	// Setters
	setSelectedExperiment(state, experiment) {
		state.selection.content = {};
		const { _id, ...experimentWithoutID } = experiment;
		state.selection._id = _id;
		Object.assign(state.selection.content, experimentWithoutID);
		delete state.selection.content._id;
	},

	unsetSelectedExperiment(state) {
		state.selection = defaultState.DEFAULT_EMPTY_SELECTION();
	},

	setEditedExperiment(state, experiment) {
		state.edition = {};
		Object.assign(state.edition, experiment);
		delete state.edition._id;
	},

	clearCompiledExperiment(state) {
		state.edition = defaultState.DEFAULT_MINIMAL_EXPERIMENT();
	},

	setHeadersList(state, experimentsHeadersLst) {
		state.experimentsHeadersList = experimentsHeadersLst;
	},

	setImposedParameterValues(state, parameters) {
		state.imposedParameterValues = {};
		for (const parameter of parameters) state.imposedParameterValues[parameter.name] = parameter.assignedValue;
	},

	setLogType(state, logType) {
		state.logType = logType;
	},
};
