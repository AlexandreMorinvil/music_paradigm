import config from "@/config";
import { Midi } from '@tonejs/midi';
import { notePerformance } from "@/_helpers";
import { clearPlayedNotes } from './functions'


export default {
    setPlayer: (state, key) => {
        state.player = key;
    },
    addStarted: (state, key) => {
        state.starteds.push(key);
    },
    deleteStarted: (state, key) => {
        const selectedIndex = state.starteds.indexOf(key);
        if (selectedIndex !== -1) state.starteds.splice(selectedIndex, 1);
    },

    // Mutations on the data from the notes played
    addPressedNoteLog: (state, key) => {
        if (state.played.notes.time.length === 0) state.played.startTime = key.time;
        state.played.notes.volume.push(key.volume);
        state.played.notes.midi.push(key.note);
        state.played.notes.time.push(key.time - state.played.startTime);
        state.played.notes.velocity.push(key.velocity);

        // TODO: Add the additional information below
        // octave = int(notenum / 12) - 1;
        // note = substring("C C#D D#E F F#G G#A A#B ", (notenum % 12) * 2, 2);
    },

    addReleasedNoteLog: (state, key) => {
        state.played.notes.duration.push(key.time - state.played.startTime);
    },


    addPlayedNotes: (state, key) => {
        state.played.notes.midi.push(key);
        // TODO: Add the additional information below
        // octave = int(notenum / 12) - 1;
        // note = substring("C C#D D#E F F#G G#A A#B ", (notenum % 12) * 2, 2);

        // Time/Offset also
        // Time in ticks?

    },
    addPlayedDurations: (state, key) => {
        state.played.notes.duration.push(key);
    },
    addPlayedOffsets: (state, key) => {
        state.played.notes.time.push(key);
    },
    addPlayedVelocities: (state, key) => {
        state.played.notes.velocity.push(key);
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
        clearPlayedNotes(state);
        
        for (let i in notes) {
            state.midiFile.notes.midi.push(notes[i].midi);
            state.midiFile.notes.time.push(notes[i].time);
            state.midiFile.notes.ticks.push(notes[i].ticks);
            state.midiFile.notes.name.push(notes[i].name);
            state.midiFile.notes.pitch.push(notes[i].pitch);
            state.midiFile.notes.octave.push(notes[i].octave);
            state.midiFile.notes.velocity.push(notes[i].velocity);
            state.midiFile.notes.duration.push(notes[i].duration);
        }
    },
    eraseMidiNotes: (state) => {
        clearPlayedNotes(state);
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