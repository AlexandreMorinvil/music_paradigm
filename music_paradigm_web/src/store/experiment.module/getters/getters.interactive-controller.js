import { defaultState } from '@/store-helper/experiment.module-helper';

// Parameters of the interactive piano
export default {
	interactivePiano: (state) => {
		return state.state.content.interactivePiano || false;
	},

	interactivePianoFirstOctave: (state) => {
		let interactivePianoFirstOctave = defaultState.DEFAULT_INTERACTIVE_PIANO_FIRST_OCTAVE;
		if (typeof state.state.settings.interactivePianoFirstOctave === 'number')
			interactivePianoFirstOctave = state.state.settings.interactivePianoFirstOctave;
		else if (typeof state.settings.interactivePianoFirstOctave === 'number') interactivePianoFirstOctave = state.settings.interactivePianoFirstOctave;
		return interactivePianoFirstOctave;
	},

	interactiveKeyboardTextMapping: (state) => {
		return state.state.mediaFile.interactiveKeyboardTextMapping || null;
	},

	interactiveClicker: (state) => {
		return state.state.content.interactiveClicker || false;
	},

	interactiveKeyboard: (state) => {
		return state.state.content.interactiveKeyboard || false;
	},
};
