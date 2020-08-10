export default {
    experimentEdited: (state) => {
        return state.edition;
    },

    experimentSelected: (state) => {
        return state.selection.content;
    },

    // Status
    hasCompiledEdition: (state) => {
        return state.status.hasCompiledEdition;
    }
}