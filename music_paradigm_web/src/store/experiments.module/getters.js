export default {
    experimentEdited: (state) => {
        return state.edition;
    },

    experimentSelected: (state) => {
        return state.selection.content;
    },

    experimentsHeadersList: (state) => {
        return state.experimentsHeadersList;
    },

    // Status
    hasCompiledEdition: (state) => {
        return state.status.hasCompiledEdition;
    }
}