import { defaultState } from '@/store-helper/writting.module-helper';

export default {
	setWittenInputContext: (state, context) => {
		state.writtingMaxCharacters = context.writtingMaxCharacters;
		state.writtingMinCharacters = context.writtingMinCharacters;
		state.writtingIsNumber = context.writtingIsNumber;
	},

	setWittenInputAnswer: (state, answer) => {
		state.writtenInput = answer;
	},

	resetWittenInput: (state) => {
		Object.assign(state, defaultState.DEFAULT_WRITTING_STATE());
	},
};
