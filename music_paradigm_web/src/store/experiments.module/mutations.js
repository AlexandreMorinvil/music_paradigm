import functions from './functions';

export default {
    setSelectedExperiment(state, experimentReference) {

    },
    setEditedExperiment(state, experiment) {
        state.edition = {};
        Object.assign(state.edition, experiment);
    }
};