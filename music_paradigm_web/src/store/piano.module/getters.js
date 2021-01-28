export default {
	// Piano
	piano: (state) => {
		return state.piano;
	},

	// Getter for the piano initialization status
	isPianoInitialized: (state) => {
		return state.isPianoInitialized;
	},

	isPianoInitializing: (state) => {
		return state.isPianoInitializing;
	},

	isPianoPaused: (state) => {
		return state.isPianoPaused;
	},

	// Getteer for the Midi File loading status
	isMidiFileLoaded: (state) => {
		return state.midiFile.isLoaded;
	},

	// Getter for the pressed keys
	pressedKeys: (state) => {
		return state.pressedKeys;
	},
	midiFileTriggeredKeys: (state) => {
		return state.midiFileTriggeredKeys;
	},

	// Getters for the current MIDI file data
	midiFileNotesMidi: (state) => {
		return state.midiFile.notes.midi;
	},
	midiFileNotesName: (state) => {
		return state.midiFile.notes.name;
	},

	// Getters for the played notes
	playedNotesMidi: (state) => {
		return state.played.notes.midi;
	},

	results: (state) => {
		return state.played.evaluation.results;
	},

	pianoSimpleLogSummary: (state) => {
		return {
			referenceName: state.midiFile.name,
			referenceKeys: state.midiFile.notes.midi,
			referenceTime: state.midiFile.notes.time,
			referenceDuration: state.midiFile.notes.duration,
			referenceVelocity: state.midiFile.notes.velocity,

			pressedStartTime: state.played.startTime,
			pressedKeys: state.played.notes.midi,
			pressedTime: state.played.notes.time,
			pressedDuration: state.played.notes.duration,
			pressedvelocity: state.played.notes.velocity,
		};
	},

	pianoSimpleLogPreprocesed: (state) => {
		return {
			consideredStart: state.played.evaluation.consideredStart,
			...state.played.evaluation.results,
		};
	},

	pianoLogSummary: (state) => {
		return {
			reference: {
				name: state.midiFile.name,
				midi: state.midiFile.notes.midi,
				time: state.midiFile.notes.time,
				duration: state.midiFile.notes.duration,
				velocity: state.midiFile.notes.velocity,
			},
			played: {
				startTime: state.played.startTime,
				midi: state.played.notes.midi,
				time: state.played.notes.time,
				duration: state.played.notes.duration,
				velocity: state.played.notes.velocity,
			},
			evaluation: {
				type: state.played.evaluation.type,
				grades: state.played.evaluation.grades,
			},
			preprocessedMetrics: state.played.evaluation.results,
		};
	},
};
