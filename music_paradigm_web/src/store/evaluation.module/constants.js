export default {
	EMPTY_EVALUATION_VALUES,
};

function EMPTY_EVALUATION_VALUES() {
	return {
		type: '',
		consideredStart: 0, // First note considered (to ignore the notes played during a pause)
		grades: null, // [ { criteria: String, isPassing: Boolean, mark: Number, passMark: Number, topMark: Number} ]
	};
}
