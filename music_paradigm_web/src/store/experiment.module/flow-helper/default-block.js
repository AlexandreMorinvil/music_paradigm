export default {
	DEFAULT_IMPOSED_TRANSITION,
	DEFAULT_TIMEOUT,
	DEFAULT_END,
};

function DEFAULT_IMPOSED_TRANSITION() {
	return {
		type: 'transition',
	};
}

function DEFAULT_END() {
	return {
		type: 'end',
		textContent: 'End',
	};
}

function DEFAULT_TIMEOUT() {
	return {
		type: 'end',
		textContent: 'Time Out',
	};
}
