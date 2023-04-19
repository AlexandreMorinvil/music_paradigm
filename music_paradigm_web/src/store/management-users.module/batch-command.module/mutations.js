export default {
    indicateExecutingBatchCommandAddTag(state, isActive) {
        state.status.isExecutingBatchCommandAddTag = isActive;
    },

    editUsersBatchCommandGroup(state, group) {
        state.group = group;
    },

    editUsersBatchCommandCurriculum(state, curriculum) {
        state.curriculum = curriculum;
    },
    
    editUsersBatchCommandIsPasswordSecret(state, isPasswordSecret) {
        state.isPasswordSecret = isPasswordSecret;
    },
    
    editUsersBatchCommandNote(state, note) {
        state.note = note;
    },

    editUsersBatchCommandPassword(state, password) {
        state.password = password;
    },

    editUsersBatchCommandTag(state, tag) {
        state.tag = tag;
    },

    setUsersBatchCommand(state, userBatchCommand) {
        state.userBatchCommand = userBatchCommand;
    },

	setUsersBatchCommandCurriculum(state, curriculum) {
		state.curriculum = curriculum;
	}
};