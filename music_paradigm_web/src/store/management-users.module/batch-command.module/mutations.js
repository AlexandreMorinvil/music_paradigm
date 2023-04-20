export default {
    indicateExecutingBatchCommandAddTag(state, isActive) {
        state.status.isExecutingBatchCommandAddTag = isActive;
    },

    indicateExecutingBatchCommandAppendToNote(state, isActive) {
        state.status.isExecutingBatchCommandAppendToNote = isActive;
    },

    indicateExecutingBatchCommandPrependToNote(state, isActive) {
        state.status.isExecutingBatchCommandPrependToNote = isActive;
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