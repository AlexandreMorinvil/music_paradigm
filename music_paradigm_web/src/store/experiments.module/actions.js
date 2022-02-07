import { experimentsApi } from '@/api';

export default {
	fetchAllExperimentsHeaders({ commit, dispatch }) {
		commit('indicateFetchingExperimentList');
		experimentsApi
			.getListAllHeaders()
			.then(
				(experimentHeadersList) => {
					commit('setHeadersList', experimentHeadersList);
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateFetchingExperimentListEnd');
			});
	},

	setEditorExperiment({ commit, dispatch }, id) {
		experimentsApi.getDefinition(id).then(
			(description) => {
				commit('setEditedExperiment', description);
				commit('setSelectedExperiment', description);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
			},
		);
	},

	setSelectionExperiment({ commit, dispatch }, id) {
		experimentsApi.getDefinition(id).then(
			(description) => {
				commit('setSelectedExperiment', description);
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
			},
		);
	},

	setImposedParameterValues({ commit }, parameters) {
		commit('setImposedParameterValues', parameters);
	},

	setLogType({ commit }, logType) {
		commit('setLogType', logType);
	},

	setTags({ commit }, tags) {
		commit('setTags', tags);
	},

	startSelectedExperiment({ dispatch, getters }) {
		if (!getters.hasExperimentSelection) return;
		dispatch('log/setLogType', getters.logType, { root: true });
		dispatch('session/setImposedTags', getters.imposedTags, { root: true });
		dispatch('experiment/setParameterValues', getters.imposedParameterValues, { root: true });
		dispatch('experiment/setExperiment', getters.experimentSelectedToRun, { root: true });
		dispatch('experiment/setStartingPoint', null, { root: true });
		dispatch('experiment/initExperiment', null, { root: true });
	},

	startExperimentQuick({ commit, dispatch, getters }, id) {
		experimentsApi.getDefinition(id).then(
			(description) => {
				dispatch('log/setLogType', getters.logType, { root: true });
				dispatch('session/setImposedTags', getters.imposedTags, { root: true });
				commit('setEditedExperiment', description);
				commit('setSelectedExperiment', description);
				dispatch('experiment/setExperiment', description, { root: true });
				dispatch('experiment/setStartingPoint', null, { root: true });
				dispatch('experiment/initExperiment', null, { root: true });
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Failed to start the experiment: ${error.message}`, { root: true });
			},
		);
	},

	copySelectionToEdition({ commit, getters }) {
		commit('setEditedExperiment', getters.experimentSelected);
	},

	unsetSelectionExperiment({ commit }) {
		commit('unsetSelectedExperiment');
	},

	compileExperiment({ commit, dispatch }, experiment) {
		experimentsApi.validateExperiment(experiment).then(
			() => {
				commit('setEditedExperiment', experiment);
				dispatch('alert/setInformationAlert', 'The experiment was compiled', {
					root: true,
				});
			},
			(error) => {
				dispatch('alert/setErrorAlert', `Compilation failed : ${error.message}`, { root: true });
			},
		);
	},

	// This action is the same as as compileExperiment, exception that on an errror, the alert is softer
	attemptExperimentCompilation({ commit, dispatch }, experiment) {
		experimentsApi.validateExperiment(experiment).then(
			() => {
				commit('setEditedExperiment', experiment);
				dispatch('alert/setInformationAlert', 'The experiment is valid and was compiled', { root: true });
			},
			(error) => {
				dispatch('alert/setWarningAlert', `The experiment could not be compiled : ${error.message}`, { root: true });
			},
		);
	},

	clearCompiledExperiment({ commit }) {
		commit('clearCompiledExperiment');
	},

	createExperiment({ commit, dispatch }, experiment) {
		commit('indicateCreateRequest');
		experimentsApi
			.create(experiment)
			.then(
				(experimentCreated) => {
					commit('setEditedExperiment', experimentCreated);
					commit('setSelectedExperiment', experimentCreated);
					dispatch('alert/setSuccessAlert', 'Experiment creation sucessful', {
						root: true,
					});
					dispatch('fetchAllExperimentsHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateCreateRequestEnd');
			});
	},

	updateExperiment({ commit, dispatch }, { id, experiment }) {
		commit('indicateUpdateRequest');
		experimentsApi
			.update(id, experiment)
			.then(
				(experimentUpdated) => {
					commit('setEditedExperiment', experimentUpdated);
					commit('setSelectedExperiment', experimentUpdated);
					dispatch('alert/setSuccessAlert', 'Experiment update sucessful', {
						root: true,
					});
					dispatch('fetchAllExperimentsHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateUpdateRequestEnd');
			});
	},

	deleteExperiment({ commit, dispatch }, id) {
		commit('indicateDeleteRequest');
		experimentsApi
			.delete(id)
			.then(
				() => {
					commit('unsetSelectedExperiment');
					dispatch('alert/setSuccessAlert', 'Experiment deletion sucessful', {
						root: true,
					});
					dispatch('fetchAllExperimentsHeaders');
				},
				(error) => {
					dispatch('alert/setErrorAlert', error.message, { root: true });
				},
			)
			.finally(() => {
				commit('indicateDeleteRequestEnd');
			});
	},
};
