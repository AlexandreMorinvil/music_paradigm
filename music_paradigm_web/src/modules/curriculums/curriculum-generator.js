import { log } from '@/_helpers';

export default {
	GENERATE_BLANK_CURRICULUM,
	GENERATE_BLANK_CURRICULUM_SESSION,
};

function GENERATE_BLANK_CURRICULUM() {
	return {
		_id: null,
		title: '',
		logType: log.defaultLogType,
		isSequential: true,
		experiments: [GENERATE_BLANK_CURRICULUM_SESSION('session_0')],
	};
}

function GENERATE_BLANK_CURRICULUM_SESSION(associativeId = "id0") {
	return {
		associativeId: associativeId,
		associativeIdOrdinalNumber: 0,
		experimentReference: '',
		title: '',
		delayInDays: 0,
		releaseTime: '00:00',
		isUniqueInDay: false,
		isCompletionLimited: true,
		text: '',
	};
}
