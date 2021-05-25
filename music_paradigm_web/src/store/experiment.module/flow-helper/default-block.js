
export default {
	DEFAULT_TIMEOUT,
	DEFAULT_END,
};

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
