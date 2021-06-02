export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	return {
		curriculumTitle: '',
		curriculumId: '',
		progressionId: '',
		associativeId: '',
		associativeIdOrdinalNumber: 0,
		startCount: 1,
		completionCount: 0,
		title: '',
		text: '',
		experiment: null,
		previousState: null,
		previousCursor: null,
		previousTimeIndicated: 0,
	};
}
