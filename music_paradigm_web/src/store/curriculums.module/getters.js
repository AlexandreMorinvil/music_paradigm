export default {
    curriculumSelectedId: (state)=> {
        return state.selection._id;
    },
    
    // userSelectedUsername: (state) => {
    //     return state.selection.username;
    // },

    // userSelectedEmail: (state) => {
    //     return state.selection.email;
    // },

    // userSelectedFirstName: (state) => {
    //     return state.selection.firstName;
    // },

    // userSelectedMiddleName: (state) => {
    //     return state.selection.middleName;
    // },

    // userSelectedLastName: (state) => {
    //     return state.selection.lastName;
    // },

    // userSelectedTags: (state) => {
    //     return state.selection.tags;
    // },

    // userSelectedRole: (state) => {
    //     return state.selection.role;
    // },

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