import { cursorHandler } from '@/store-helper/experiment.module-helper';

// Getters for the experiment flow's information
export default {
	isInMainFlow: (state) => {
		return !state.cursor.flag.isInPrelude && !state.cursor.flag.isInConclusion;
	},

	isInPrelude: (state) => {
		return state.cursor.flag.isInPrelude;
	},

	isInConclusion: (state) => {
		return state.cursor.flag.isInConclusion;
	},

	stepsTotalCount: (state) => {
		return cursorHandler.countStepsLeft(state.flow);
	},

	stepsLeftCount: (state) => {
		return cursorHandler.countStepsLeft(state.flow, state.cursor);
	},

	isBeyondEnd: (state) => {
		return state.cursor.flag.isBeyondEnd;
	},

	currentIndex: (state) => {
		return state.cursor.current.index;
	},

	currentInnerStepIndex: (state) => {
		return state.cursor.current.innerStepIndex;
	},

	currentRepetition: (state) => {
		const totalRepetitions = state.cursor.navigation.totalNumberRepetitions;
		const repetitionsLeft = state.cursor.current.numberRepetition;
		return totalRepetitions - repetitionsLeft + 1;
	},

	isFirstIndexPassage: (state) => {
		return state.cursor.flag.isFirstIndexPassage;
	},

	needsResetLoopParameters: (state) => {
		return state.cursor.flag.needsResetLoopParameters;
	},

	isNewBlock: (state) => {
		return state.cursor.flag.isNewBlock;
	},
};
