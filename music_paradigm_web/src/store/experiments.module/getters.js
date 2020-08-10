export default {
    experimentEdited: (state) => {
        return state.edition;
    },

    experimentSelected: (state) => {
        return state.selection.content;
    },

    // Status
    isEditionCompiled: (state) => {
        return state.status.isEditionCompiled;
    }
}