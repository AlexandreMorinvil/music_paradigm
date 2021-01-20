export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	return {
		curriculumTitle: '',
		assosiativeId: '',
		title: '',
		text: '',
		experiment: null,
		previousState: null,
		previousCursor: null,
	};
}
