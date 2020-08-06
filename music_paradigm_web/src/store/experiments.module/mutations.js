import functions from './functions';

export default {
    setSelectedExperiment(state, experimentReference) {

    },
    setEditedExperiment(state, experimentEditedText) {
        let editedExperiment = JSON.parse(experimentEditedText);
        Object.assign(state.edition, editedExperiment);
    }
};