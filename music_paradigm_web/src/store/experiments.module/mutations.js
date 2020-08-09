export default {
    indicateRequest(state, statusIndicator) {
        state.status[statusIndicator] = true;
    },

    indicateRequestEnd(state, statusIndicator) {
        state.status[statusIndicator] = false;
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