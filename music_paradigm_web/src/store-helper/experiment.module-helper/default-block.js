/* eslint-disable quotes */
export default {
	DEFAULT_IMPOSED_TRANSITION,
	DEFAULT_TIME_UP,
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

function DEFAULT_TIME_UP() {
	return {
		type: 'end',
		textContent: "Time's Up",
	};
}
