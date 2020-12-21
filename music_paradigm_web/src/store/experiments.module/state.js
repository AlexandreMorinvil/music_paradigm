import{ validator } from'@/_helpers';

export default{
	status: {
		isFetchingExperimentHeadersList: false,
		isCreating: false,
		isUpdating: false,
		isDeleting: false,
		hasCompiledEdition: false
	},

	edition: validator.getMinimalValidExperimentStructure(),
	selection: {
		_id: null,
		content: validator.getMinimalValidExperimentStructure()
	},
	experimentsHeadersList: [
		{
			_id: '',
			group: '',
			name: '',
			version: 0,
			folder: ''
		}
	]
};
