import { ressourceService } from '../../_services';

export default {
	resetPianoState: ({ commit }) => {
		commit('resetPianoState');
	},

	// Initialization actions
	setInitializedState: ({ commit }, isInitialized) => {
		commit('setInitializedState', isInitialized);
	},

	setInitializingState: ({ commit }, isInitializing) => {
		commit('setInitializingState', isInitializing);
	},

	// Pausing the piano
	pausePiano: ({ commit }) => {
		commit('pausePiano');
	},

	// Pausing the piano
	unPausePiano: ({ commit }) => {
		commit('unPausePiano');
	},

	// Player actions
	setPlayer: ({ commit }, player) => {
		commit('setPlayer', player);
	},
	clearPlayer: ({ commit }) => {
		commit('clearPlayer');
	},

	playMidiFile: ({ commit }) => {
		commit('playMidiFile');
	},
	addPlayerEndOfFileAction: ({ commit }, functionToExecute) => {
		commit('addPlayerEndOfFileAction', functionToExecute);
	},
	removePlayerEndOfFileAction: ({ commit }, functionToRemove) => {
		commit('removePlayerEndOfFileAction', functionToRemove);
	},

	// Piano instance
	setPiano: ({ commit }, piano) => {
		commit('setPiano', piano);
	},
	clearPiano: ({ commit }) => {
		commit('clearPiano');
	},

	// Key interaction actions
	addPressedKey: ({ commit }, key) => {
		commit('addPressedKey', key);
	},
	deletePressedKey: ({ commit }, key) => {
		commit('deletePressedKey', key);
	},
	addMidiFileTriggeredKey: ({ commit }, key) => {
		commit('addMidiFileTriggeredKey', key);
	},
	deleteMidiFileTriggeredKey: ({ commit }, key) => {
		commit('deleteMidiFileTriggeredKey', key);
	},
	deleteAllMidiFileTriggeredKey: ({ commit }) => {
		commit('deleteAllMidiFileTriggeredKey');
	},

	// Log of played notes
	addPressedNoteLog: ({ commit }, key) => {
		commit('addPressedNoteLog', key);
	},

	addReleasedNoteLog: ({ commit }, key) => {
		commit('addReleasedNoteLog', key);
	},

	resetPlayedNotesLogs: ({ commit }) => {
		commit('resetPlayedNotesLogs');
	},

	// Midi file management
	eraseMidiFile: ({ commit }) => {
		commit('eraseMidiFile');
	},
	loadMidiFile: ({ commit, dispatch }, midiFileName) => {
		dispatch('eraseMidiFile');
		return ressourceService.fetchMidiFile(midiFileName).then(
			(response) => {
				commit('setMidiFileName', midiFileName);
				commit('loadMidiArrayStream', response);
				commit('parseMidiNotes', response);
			},
			(error) => {
				console.error(`Midi file fail:\n${error}`);
			},
		);
	},

	// Performance evaluation
	evaluateRhythmType: ({ commit, dispatch, getters }, isRelativeRhythm = false) => {
		commit('evaluateRhythmType');
		dispatch('evaluation/evaluateRhythmType', { results: getters.results, isRelativeRhythm: isRelativeRhythm }, { root: true });
	},
	evaluateSpeedType: ({ commit, dispatch, getters }) => {
		commit('evaluateSpeedType');
		dispatch('evaluation/evaluateSpeedType', getters.results, { root: true });
	},
	evaluateMelodyType: ({ commit, dispatch, getters }, melodyRepetion) => {
		commit('evaluateMelodyType', melodyRepetion);
		dispatch('evaluation/evaluateMelodyType', getters.results, { root: true });
	},
};
