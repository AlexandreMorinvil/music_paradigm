export default {
    indicateExecutingBatchCommandAddTag(state, isActive) {
        state.status.isExecutingBatchCommandAddTag = isActive;
    },

    indicateExecutingBatchCommandAppendToNote(state, isActive) {
        state.status.isExecutingBatchCommandAppendToNote = isActive;
    },

    indicateExecutingBatchCommandDeleteUsers(state, isActive) {
        state.status.isExecutingBatchCommandDeleteUsers = isActive;
    },

    indicateExecutingBatchCommandPrependToNote(state, isActive) {
        state.status.isExecutingBatchCommandPrependToNote = isActive;
    },

    indicateExecutingBatchCommandRemoveAllTags(state, isActive) {
        state.status.isExecutingBatchCommandRemoveAllTags = isActive;
    },

    indicateExecutingBatchCommandRemoveTag(state, isActive) {
        state.status.isExecutingBatchCommandRemoveTag = isActive;
    },

    indicateExecutingBatchCommandSetGroup(state, isActive) {
        state.status.isExecutingBatchCommandSetGroup = isActive;
    },

    indicateExecutingBatchCommandSetNote(state, isActive) {
        state.status.isExecutingBatchCommandSetNote = isActive;
    },

    indicateExecutingBatchCommandSetPassword(state, isActive) {
        state.status.isExecutingBatchCommandSetPassword = isActive;
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