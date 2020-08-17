export default {
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
        return state.status.hasCompiledEdition;
    },

    isFetchingExperimentHeadersList: (state) => {
        return state.status.isFetchingExperimentHeadersList;
    }
}