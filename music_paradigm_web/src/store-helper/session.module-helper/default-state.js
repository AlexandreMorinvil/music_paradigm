import { log } from '@/_helpers';

export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	const randomUniqueId = String(new Date().valueOf());
	return {
		curriculumTitle: '',
		curriculumId: '',
		progressionId: '',
		associativeId: randomUniqueId,
		associativeIdOrdinalNumber: 0,
		startCount: 1,
		completionCount: 0,
		title: '',
		text: '',
		experiment: null,
		previousState: null,
		previousCursor: null,
		previousTimeIndicated: 0,
		assignedParameters: {},
		logType: log.defaultLogType,
	};
}
