export default {
	PRE_SESSION_STATE,
	EMPTY_SESSION_INFORMATION,
};

function PRE_SESSION_STATE() {
	return {
		hasHadMessage: false,
		hasHadAdvice: false,
		hasHadPiano: false,
	};
}

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
