import{ ressourceService } from'../../_services';

export default{
	resetPianoState: ({ commit }) => {
		commit('resetPianoState');
	},

	// Initialization actions
	setInitializationState: ({ commit }, isInitialized) => {
		commit('setInitializationState', isInitialized);
	},

	// Player actions
	setPlayer: ({ commit }, player) => {
		commit('setPlayer', player);
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
		return ressourceService.fetchMidiFile(midiFileName)
			.then(
				(response) => {
					commit('setMidiFileName', midiFileName);
					commit('loadMidiArrayStream', response);
					commit('parseMidiNotes', response);
				},
				(error) => {
					console.error(`Midi file fail:\n${error}`);
				}
			);
	},

	// Performance evaluation
	evaluateRhythmType: ({ commit }) => {
		commit('evaluateRhythmType');
	},
	evaluateSpeedType: ({ commit }) => {
		commit('evaluateSpeedType');
	},
	evaluateMelodyType: ({ commit }, melodyRepetion) => {
		commit('evaluateMelodyType', melodyRepetion);
	}
};
