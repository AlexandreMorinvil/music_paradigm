export default {
    curriculumSelectedId: (state) => {
        return state.selection._id;
    },

    curriculumSelectedTitle: (state) => {
        return state.selection.title;
    },

    curriculumSelectedIsSequential: (state) => {
        return state.selection.isSequential;
    },

    curriculumSelectedExperiments: (state) => {
        return state.selection.experiments;
    },

    curriculumSelectedExperimentAtIndex: (state) => (index) => {
        return state.selection.experiments[index] || {};
    },

    curriculumsHeadersList: (state) => {
        return state.curriculumsHeadersList;
    },

    // Status
    hasSelectedCurriculum: (state) => {
        return Boolean(state.selection._id);
    },

    isFetchingCurriculumsHeadersList: (state) => {
        return state.status.isFetchingCurriculumsHeadersList;
    }
}