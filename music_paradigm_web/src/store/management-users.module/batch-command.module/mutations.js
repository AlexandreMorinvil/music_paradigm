export default {
    indicateCreatingUsersFromCsv(state, isActive) {
        state.status.isCreatingUsersFromCsv = isActive;
    },

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

    indicateGettingUsersCreationTemplateCsv(state, isActive) {
        state.status.isGettingUsersCreationTemplateCsv = isActive;
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

    setUsersBatchCommandCsvFile(state, csvFile) {
        const file = (csvFile instanceof FileList) ? csvFile[0] : csvFile;
        state.csvFileContent = null, state.csvFileName = null;
        if (!file) return;
        
        let fileReader = new FileReader();
        fileReader.onload = (event) => {
            state.csvFileContent = event.target.result;
            state.csvFileName = file.name;
        };
        fileReader.readAsText(file);
    },

	setUsersBatchCommandCurriculum(state, curriculum) {
		state.curriculum = curriculum;
	}
};