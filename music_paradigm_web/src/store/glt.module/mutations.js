import { defaultState } from '@/store-helper/question.module-helper';

export default {
	recordMatrixSetup: (state, setup) => {
		state.numberImages = setup.numberImages;
		state.xMatrixDimension = setup.xMatrixDimension;
		state.yMatrixDimension = setup.yMatrixDimension;
		state.imagePositions = setup.imagePositions;
	},

	recordGltResults: (state, answers) => {
		state.tagetImage = answers.tagetImage;
		state.targetImagePosition = answers.targetImagePosition;
		state.timeToClick = answers.timeToClick;
		state.positionClicked = answers.positionClicked;
		state.imageAtPositionClicked = answers.imageAtPositionClicked;
		state.isAnswerRightList = answers.isAnswerRightList;
		state.interogationsCount = answers.interogationsCount;
		state.rightAnswersCount = answers.rightAnswersCount;
	},

	resetGltRecords: (state) => {
		Object.assign(state, defaultState.DEFAULT_GLT_STATE());
	},
};
