export default {
	EMPTY_SESSION_INFORMATION,
};

function EMPTY_SESSION_INFORMATION() {
	return {
		assosiativeId: '',
		title: '',
		text: '',
		experiment: null,
		previousState: null,
		previousCursor: null,
	};
}
