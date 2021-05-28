export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	return {
		curriculumTitle: '',
		curriculumId: '',
		progressionId: '',
		associativeId: '',
		title: '',
		text: '',
		experiment: null,
		previousState: null,
		previousCursor: null,
	};
}
