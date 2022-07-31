import { defaultState } from '@/store-helper/question.module-helper';

export default {
	setMatrixSetup: (state, setup) => {
		state.numberImages = setup.numberImages;
		state.xMatrixDimension = setup.xMatrixDimension;
		state.yMatrixDimension = setup.yMatrixDimension;
		state.imagePositions = setup.imagePositions;
	},

	recordGridLocationTaksAnswers: (state, answers) => {
		state.tagetImage = answers.tagetImage;
		state.targetImagePosition = answers.targetImagePosition;
		state.timeToClick = answers.timeToClick;
		state.positionClicked = answers.positionClicked;
		state.imageAtPositionClicked = answers.imageAtPositionClicked;
		state.isAnswerRightList = answers.isAnswerRightList;
		state.interocationsCount = answers.interocationsCount;
		state.rightAnswersCount = answers.rightAnswersCount;
	},

	resetGridLocationTaskRecords: (state) => {
		Object.assign(state, defaultState.DEFAULT_GLT_STATE());
	},
};
