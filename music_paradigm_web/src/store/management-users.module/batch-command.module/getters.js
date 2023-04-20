export default {
	isExecutingBatchCommandAddTag: (state) => {
		return state.status.isExecutingBatchCommandAddTag;
	},

	isExecutingBatchCommandAppendToNote: (state) => {
		return state.status.isExecutingBatchCommandAppendToNote;
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

	usersBatchCommand: (state) => {
		return state.userBatchCommand;
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
