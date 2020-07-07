import config from "@/config";
import { Midi } from '@tonejs/midi';
import { notePerformance } from "@/_helpers";
import { clearMidiNotes } from './functions'


export default {
    setPlayer: (state, key) => {
        state.player = key;
    },
    addPressedKey: (state, key) => {
        state.pressedKeys.push(key);
    },
    deletePressedKey: (state, key) => {
        const selectedIndex = state.pressedKeys.indexOf(key);
        if (selectedIndex !== -1) state.pressedKeys.splice(selectedIndex, 1);
    },

    // Mutations on the data from the notes played
    addPressedNoteLog: (state, key) => {
        const noteCount = state.played.notes.midi.length;
        if (noteCount === 0) state.played.startTime = key.time;
        state.played.notes.volume.push(key.volume);
        state.played.notes.midi.push(key.note);
        state.played.notes.time.push(key.time - state.played.startTime);
        state.played.notes.pitch.push("C C#D D#E F F#G G#A A#B ".substr((key.note % 12) * 2, 2).replace(/\s+/g, ''));
        state.played.notes.octave.push(((key.note / 12) | 0) - 1);
        state.played.notes.velocity.push(key.velocity);
        state.played.notes.name.push(
            state.played.notes.pitch[noteCount].concat(
                state.played.notes.octave[noteCount]));
    },

    addReleasedNoteLog: (state, key) => {
        state.played.notes.duration.push(key.time
            - state.played.startTime
            - state.played.notes.time[state.played.notes.time.length - 1]);
    },

    resetPlayedNotesLogs: (state) => {
        // Record start time
        state.played.startTime = 0;

        // Resetting the notes
        state.played.notes.midi = [];
        state.played.notes.duration = [];
        state.played.notes.time = [];
        state.played.notes.velocity = [];

        // Resetting the evaluation
        state.played.evaluation.type = "";
        state.played.evaluation.results = null;
        state.played.evaluation.grades = null;
    },

    // Mutations on the midi files data
    setMidiFileName: (state, midiFileName) => {
        state.midiFile.name = midiFileName;
    },
    loadMidiArrayStream: (state, midiFile) => {
        state.player.loadArrayBuffer(midiFile);
    },
    parseMidiNotes: (state, midiFile) => {
        const jsonMidi = new Midi(midiFile);
        const notes = jsonMidi.tracks[0].notes;
        clearMidiNotes(state);

        for (let i in notes) {
            state.midiFile.notes.midi.push(notes[i].midi);
            state.midiFile.notes.time.push(notes[i].time * 1000);
            state.midiFile.notes.ticks.push(notes[i].ticks);
            state.midiFile.notes.name.push(notes[i].name);
            state.midiFile.notes.pitch.push(notes[i].pitch);
            state.midiFile.notes.octave.push(notes[i].octave);
            state.midiFile.notes.velocity.push(notes[i].velocity);
            state.midiFile.notes.duration.push(notes[i].duration * 1000);
        }
    },
    eraseMidiNotes: (state) => {
        clearMidiNotes(state);
    },
    playMidiFile: (state) => {
        state.player.play();
    },

    // Mutations for note performance evaluation
    // TODO: Ensure those functions work properly
    evaluateSpeedType: (state) => {
        // Evaluate the performance according to get specific metrics
        Object.assign(state.played.evaluation,
            notePerformance.evaluateSpeedType(state.midiFile.notes, state.played.notes));

        // Grade the performance according to obtained metrics to provide feedback
        state.played.evaluation.grades = notePerformance.gradeSpeedType(
            state.played.evaluation.results, {
            minSequencePlayed: config.minSequencePlayed || 1
        });
    },
    evaluateRhythmType: (state) => {
        // Evaluate the performance according to get specific metrics
        Object.assign(state.played.evaluation,
            notePerformance.evaluateRhythmType(state.midiFile.notes, state.played.notes));

        // Grade the performance according to obtained metrics to provide feedback
        state.played.evaluation.grades = notePerformance.gradeRhythmType(
            state.played.evaluation.results, {
            minNoteAccuracy: config.minNoteAccuracy || 100,
            maxRhythmError: config.maxRhythmError || 0.15
        });
    }
}