export default {
	numberImages: (state) => {
		return state.numberImages;
	},

	xMatrixDimension: (state) => {
		return state.xMatrixDimension;
	},

	yMatrixDimension: (state) => {
		return state.yMatrixDimension;
	},

	imagePositions: (state) => {
		return state.imagePositions;
	},

	tagetImage: (state) => {
		return state.tagetImage;
	},

	targetImagePosition: (state) => {
		return state.targetImagePosition;
	},

	timeToClick: (state) => {
		return state.timeToClick;
	},

	positionClicked: (state) => {
		return state.positionClicked;
	},

	imageAtPositionClicked: (state) => {
		return state.imageAtPositionClicked;
	},

	isAnswerRightList: (state) => {
		return state.isAnswerRightList;
	},

	interocationsCount: (state) => {
		return state.interocationsCount;
	},

	rightAnswersCount: (state) => {
		return state.rightAnswersCount;
	},
};
