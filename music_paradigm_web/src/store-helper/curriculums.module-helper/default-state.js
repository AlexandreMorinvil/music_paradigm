export default {
	EMPTY_SELECTED_CURRICULUM,
	EMPTY_CURRICULUMS_LIST,
	BLANK_CURRICULUM_EXPERIMENT,
};

function EMPTY_SELECTED_CURRICULUM() {
	return {
		_id: null,
		title: '',
		logType: '',
		isSequential: true,
		experiments: [],
	};
}

function EMPTY_CURRICULUMS_LIST() {
	return [
		{
			_id: null,
			title: '',
			logType: '',
			isSequential: true,
			experimentsCount: 0,

			optionVariableValues: {},
			defaultVariableAssignation: {},
		},
	];
}

function BLANK_CURRICULUM_EXPERIMENT(index) {
	return {
		associativeId: 'id' + index,
		associativeIdOrdinalNumber: 0,
		experimentReference: '',
		title: '',
		delayInDays: 0,
		releaseTime: '00:00',
		isUniqueIndDay: true,
		isCompletionLimited: true,
		text: '',
	};
}
