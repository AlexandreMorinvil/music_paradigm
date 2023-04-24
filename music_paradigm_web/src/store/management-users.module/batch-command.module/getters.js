export default {
	hasUsersCreationCsvFile: (state) => {
		return Boolean(state.csvFileName);
	},

	isCreatingUsersFromCsv: (state) => {
		return state.status.isCreatingUsersFromCsv;
	},

	isExecutingBatchCommandAddTag: (state) => {
		return state.status.isExecutingBatchCommandAddTag;
	},

	isExecutingBatchCommandAppendToNote: (state) => {
		return state.status.isExecutingBatchCommandAppendToNote;
	},

	isExecutingBatchCommandDeleteUsers: (state) => {
		return state.status.isExecutingBatchCommandDeleteUsers;
	},

	isExecutingBatchCommandPrependToNote: (state) => {
		return state.status.isExecutingBatchCommandPrependToNote;
	},

	isExecutingBatchCommandRemoveAllTags: (state) => {
		return state.status.isExecutingBatchCommandRemoveAllTags;
	},

	isExecutingBatchCommandRemoveTag: (state) => {
		return state.status.isExecutingBatchCommandRemoveTag;
	},

	isExecutingBatchCommandSetGroup: (state) => {
		return state.status.isExecutingBatchCommandSetGroup;
	},

	isExecutingBatchCommandSetNote: (state) => {
		return state.status.isExecutingBatchCommandSetNote;
	},

	isExecutingBatchCommandSetPassword: (state) => {
		return state.status.isExecutingBatchCommandSetPassword;
	},

	isGettingUsersCreationTemplateCsv: (state) => {
		return state.status.isGettingUsersCreationTemplateCsv;
	},

	usersBatchCommand: (state) => {
		return state.userBatchCommand;
	},

	usersBatchCommandCsvFileContent: (state) => {
		return state.csvFileContent;
	},

	usersBatchCommandCsvFileName: (state) => {
		return state.csvFileName;
	},

	usersBatchCommandCurriculum: (state) => {
		return state.curriculum;
	},

	usersBatchCommandGroup: (state) => {
		return state.group;
	},

	usersBatchCommandNote: (state) => {
		return state.note;
	},

	usersBatchCommandIsPasswordSecret: (state) => {
		return state.isPasswordSecret;
	},

	usersBatchCommandPassword: (state) => {
		return state.password;
	},

	usersBatchCommandTag: (state) => {
		return state.tag;
	},
};
