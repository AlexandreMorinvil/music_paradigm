export default {
    indicateCreateRequest(state) {
        state.status.isCreating = true;
    },

    indicateCreateRequestEnd(state) {
        state.status.isCreating = false;
    },

    indicateHasCompiledEdition(state) {
        state.status.hasCompiledEdition = true;
    },

    indicateHasNoCompiledEdition(state) {
        state.status.hasCompiledEdition = false;
    },

    setSelectedExperiment(state, experiment) {
        state.selection.content = {};
        const { _id, ...experimentWithoutID } = experiment;
        state.selection._id = _id;
        Object.assign(state.selection.content, experimentWithoutID);
        delete state.selection.content._id;
    },

    setEditedExperiment(state, experiment) {
        state.edition = {};
        Object.assign(state.edition, experiment);
        delete state.edition._id;
    }
};