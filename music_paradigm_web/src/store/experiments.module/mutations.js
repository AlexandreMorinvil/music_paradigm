import functions from './functions';

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
        Object.assign(state.selection._id, _id);
        Object.assign(state.selection.content, experimentWithoutID);
    },

    setEditedExperiment(state, experiment) {
        state.edition = {};
        const { _id, ...experimentWithoutID } = experiment;
        Object.assign(state.edition, experimentWithoutID);
    }
};