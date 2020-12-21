export default{
	status: {
		isFetchingCurriculumsHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false
	},

	selection: {
		_id: null,
		// The Rest of the parameters are also included
		title: '',
		isSequential: true,
		experiments: []
	},

	curriculumsHeadersList: [
		{
			_id: null,
			title: '',
			isSequential: true,
			experimentsCount: 0
		}
	]
};
