export default {
	reproductionSeed: (state) => {
		return state.reproductionSeed;
	},

	includesPresentation: (state) => {
		return state.includesPresentation;
	},

	includesTest: (state) => {
		return state.includesTest;
	},

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

	interrogationsCount: (state) => {
		return state.interrogationsCount;
	},

	rightAnswersCount: (state) => {
		return state.rightAnswersCount;
	},
};
