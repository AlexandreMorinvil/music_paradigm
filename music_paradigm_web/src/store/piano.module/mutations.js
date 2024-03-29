import { Midi } from '@tonejs/midi';

import { defaultState, notesHandler } from '@/store-helper/piano.module-helper';
import { midiConversion, notePerformance } from '@/_helpers';

export default {
	resetPianoState: (state) => {
		Object.assign(state, defaultState.DEFAULT_PIANO_STATE_VALUES());
	},

	// Player methods
	setPlayer: (state, player) => {
		state.player = player;
	},

	unsetPlayer: (state) => {
		state.player = null;
	},

	// Pausing the piano
	pausePiano: (state) => {
		state.isPianoPaused = true;
	},

	unPausePiano: (state) => {
		state.isPianoPaused = false;
		state.played.evaluation.consideredStart = state.played.notes.midi.length;
	},

	// Mutation on isPianoInitialized
	setInitializedState: (state, isInitialized) => {
		state.isPianoInitialized = isInitialized || false;
	},

	setInitializingState: (state, isInitializing) => {
		state.isPianoInitializing = isInitializing || false;
	},

	// Mutations on player
	playMidiFile: (state) => {
		state.player.play();
	},
	addPlayerEndOfFileAction: (state, functionToExecute) => {
		state.player.on('endOfFile', functionToExecute);
	},
	removePlayerEndOfFileAction: (state, functionToRemove) => {
		state.player.off('endOfFile', functionToRemove);
	},

	// Mutations on key interations arrays
	addPressedKey: (state, key) => {
		// This approach is used to add the pressed keys  in an array to ensure that only one insance of a given key is recorded at a time and to ensure that
		// the mutations on pressedKeys or midiFileTriggeredKeys can be reactive with the vue instances. Doing a direct assignation as pressedKey[key] = true
		// is would be a direct assignation in an Array/Object and would not allow the watch properties of Vue to detect the change of state.
		const selectedIndex = state.pressedKeys.indexOf(key);
		if (selectedIndex === -1) state.pressedKeys.push(key);
	},
	deletePressedKey: (state, key) => {
		const selectedIndex = state.pressedKeys.indexOf(key);
		if (selectedIndex !== -1) state.pressedKeys.splice(selectedIndex, 1);
	},
	deleteAllPressedKeys: (state) => {
		state.pressedKeys.splice(0, state.pressedKeys.length);
	},
	addMidiFileTriggeredKey: (state, key) => {
		const selectedIndex = state.midiFileTriggeredKeys.indexOf(key);
		if (selectedIndex === -1) state.midiFileTriggeredKeys.push(key);
	},
	deleteMidiFileTriggeredKey: (state, key) => {
		const selectedIndex = state.midiFileTriggeredKeys.indexOf(key);
		if (selectedIndex !== -1) state.midiFileTriggeredKeys.splice(selectedIndex, 1);
	},
	deleteAllMidiFileTriggeredKey: (state) => {
		state.midiFileTriggeredKeys.splice(0, state.midiFileTriggeredKeys.length);
	},

	// Mutations on the data from the notes played
	addPressedNoteLog: (state, key) => {
		const noteCount = state.played.notes.midi.length;
		if (noteCount === 0) state.played.startTime = key.time;
		state.played.notes.volume.push(key.volume);
		state.played.notes.midi.push(key.note);
		state.played.notes.velocity.push(key.velocity);
		state.played.notes.time.push(key.time - state.played.startTime);
		state.played.notes.pitch.push(midiConversion.midiNumberToPitch(key.note));
		state.played.notes.octave.push(midiConversion.midiNumberToOctave(key.note));
		state.played.notes.name.push(midiConversion.midiNumberToName(key.note));
	},

	addReleasedNoteLog: (state, key) => {
		const indexOfNoteReleased = state.played.notes.midi.lastIndexOf(key.note);

		const pressTime = state.played.notes.time[indexOfNoteReleased];
		const releaseTime = key.time - state.played.startTime;
		const duration = releaseTime - pressTime;

		state.played.notes.duration[indexOfNoteReleased] = duration;
	},

	releasedAllNotesNotReleasedInLog: (state, stopTime) => {
		const releaseTime = (stopTime || new Date()) - state.played.startTime;
		const { duration, midi, time } = state.played.notes;
		for (let i = 0; i < midi.length; i++) if (!duration[i]) duration[i] = releaseTime - time[i];
	},

	resetPlayedNotesLogs: (state) => {
		// Record start time
		state.played.startTime = 0;

		// Resetting the notes
		state.played.notes.volume = [];
		state.played.notes.midi = [];
		state.played.notes.time = [];
		state.played.notes.name = [];
		state.played.notes.duration = [];
		state.played.notes.pitch = [];
		state.played.notes.octave = [];
		state.played.notes.velocity = [];

		// Resetting the evaluation
		// We do note reset the grades, in order to have them available to be displayed in a "Feedback" state at any point, until the next evaluation of performances
		state.played.evaluation.type = '';
		state.played.evaluation.results = null;
		state.played.evaluation.consideredStart = 0;
	},

	// Mutations on the midi files data
	eraseMidiFile: (state) => {
		state.midiFile.name = '';
		state.midiFile.isLoaded = false;
		state.player.deleteFile();
		notesHandler.clearMidiFileNotes(state);
	},

	setMidiFileName: (state, midiFileName) => {
		state.midiFile.name = midiFileName;
	},

	loadMidiArrayStream: (state, midiFile) => {
		state.player.loadArrayBuffer(midiFile);
		state.midiFile.isLoaded = true;
	},

	parseMidiNotes: (state, midiFile) => {
		const jsonMidi = new Midi(midiFile);
		const notes = jsonMidi.tracks[0].notes;
		notesHandler.clearMidiFileNotes(state);
		for (const i in notes) {
			state.midiFile.notes.midi.push(notes[i].midi);
			state.midiFile.notes.time.push(notes[i].time * 1000);
			state.midiFile.notes.name.push(notes[i].name);
			state.midiFile.notes.pitch.push(notes[i].pitch);
			state.midiFile.notes.octave.push(notes[i].octave);
			state.midiFile.notes.velocity.push(notes[i].velocity);
			state.midiFile.notes.duration.push(notes[i].duration * 1000);
		}
	},

	// Mutations for note performance evaluation
	evaluateSpeedType: (state) => {
		const consideredPlayedNotes = notesHandler.selectConsideredNotes(state.played.notes, state.played.evaluation.consideredStart);
		Object.assign(state.played.evaluation, notePerformance.evaluateSpeedType(state.midiFile.notes, consideredPlayedNotes));
	},

	evaluateRhythmType: (state, { rhythmErrorMarginInMilliseconds = 0, rhythmRelativeErrorMarginInFloat = 0 }) => {
		const consideredPlayedNotes = notesHandler.selectConsideredNotes(state.played.notes, state.played.evaluation.consideredStart);
		Object.assign(
			state.played.evaluation,
			notePerformance.evaluateRhythmType(
				state.midiFile.notes,
				consideredPlayedNotes,
				rhythmErrorMarginInMilliseconds,
				rhythmRelativeErrorMarginInFloat,
			),
		);
	},

	evaluateMelodyType: (state, melodyRepetion) => {
		const consideredPlayedNotes = notesHandler.selectConsideredNotes(state.played.notes, state.played.evaluation.consideredStart);
		const reference = notesHandler.multiplyMidiFileNotes(state, melodyRepetion);
		Object.assign(state.played.evaluation, notePerformance.evaluateMelodyType(reference, consideredPlayedNotes));
	},
};
