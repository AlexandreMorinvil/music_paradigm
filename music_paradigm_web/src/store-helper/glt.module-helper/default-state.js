export default {
	DEFAULT_GLT_STATE,
};

function DEFAULT_GLT_STATE() {
	return {
		// Matrix setup.
		numberImages: 0,
		xMatrixDimension: 0,
		yMatrixDimension: 0,
		imagePositions: [],

		// Answer results.
		tagetImage: [],
		targetImagePosition: [],
		timeToClick: [],
		positionClicked: [],
		imageAtPositionClicked: [],
		isAnswerRightList: [],
		interrogationsCount: [],
		rightAnswersCount: [],
	};
}
