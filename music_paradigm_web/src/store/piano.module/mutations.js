import { Midi } from '@tonejs/midi'

export default {
    setPlayer: (state, key) => {
        state.player = key;
    },
    setSongNum: (state, key) => {
        state.songNum = key;
    },
    addStarted: (state, key) => {
        state.starteds.push(key);
    },
    deleteStarted: (state, key) => {
        const selectedIndex = state.starteds.indexOf(key);
        if (selectedIndex !== -1) state.starteds.splice(selectedIndex, 1);
        // delete state.started[key]
    },

    // Mutations on the data from the notes played
    addPlayedNotes: (state, key) => {
        state.played.notes.midi.push(key);
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
        state.played.notes.midi = [];
        state.played.notes.duration = [];
        state.played.notes.time = [];
        state.played.notes.velocity = [];
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
        for(let i in notes) {
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
        state.midiFile.notes.midi = [];
        state.midiFile.notes.time = [];
        state.midiFile.notes.ticks = [];
        state.midiFile.notes.name = [];
        state.midiFile.notes.pitch = [];
        state.midiFile.notes.octave = [];
        state.midiFile.notes.velocity = [];
        state.midiFile.notes.duration = [];
    },
    playMidiFile: (state) => {
        state.player.play();
    }
}