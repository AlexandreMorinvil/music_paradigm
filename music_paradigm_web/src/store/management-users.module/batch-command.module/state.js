export default {
	status: {
		isCreatingUsersFromCsv: false,
		isExecutingBatchCommandAddTag: false,
		isExecutingBatchCommandAppendToNote: false,
		isExecutingBatchCommandDeleteUsers: false,
		isExecutingBatchCommandPrependToNote: false,
		isExecutingBatchCommandRemoveAllTags: false,
		isExecutingBatchCommandRemoveTag: false,
		isExecutingBatchCommandSetGroup: false,
		isExecutingBatchCommandSetPassword: false,
		isExecutingBatchCommandSetNote: false,
		isGettingUsersCreationTemplateCsv: false,
	},

	userBatchCommand: null,
	curriculum: null,
	password: '',
	isPasswordSecret: true,
	group: '',
	note: '',
	tag: '',

	csvFile: null, // File
};