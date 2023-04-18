export default {
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
