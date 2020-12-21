import { validator } from '@/_helpers';

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
		state.selection._id = null;
		state.selection.content = validator.getMinimalValidExperimentStructure();
	},

	setEditedExperiment(state, experiment) {
		state.edition = {};
		Object.assign(state.edition, experiment);
		delete state.edition._id;
	},

	clearCompiledExperiment(state) {
		state.edition = validator.getMinimalValidExperimentStructure();
	},

	setHeadersList(state, experimentsHeadersLst) {
		state.experimentsHeadersList = experimentsHeadersLst;
	},
};
