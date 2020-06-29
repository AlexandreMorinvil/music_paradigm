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

    // Mutations on the data from the midi files
    addSongNotes: (state, key) => {
        state.songNotes.push(key);
    },
    setSongNotes: (state, key) => {
        state.songNotes = key;
    },
    addSongDurations: (state, key) => {
        state.songDurations.push(key);
    },
    setSongDurations: (state, key) => {
        state.songDurations = key;
    },

    // Mutations on the data from the notes played
    addPlayedNotes: (state, key) => {
        state.playedNotes.push(key);
    },
    setPlayedNotes: (state, key) => {
        state.playedNotes = key;
    },
    addPlayedDurations: (state, key) => {
        state.playedDurations.push(key);
    },
    setPlayedDurations: (state, key) => {
        state.playedDurations = key;
    },
    addPlayedOffsets: (state, key) => {
        state.playedOffsets.push(key);
    },
    setPlayedOffsets: (state, key) => {
        state.playedOffsets = key;
    },
    addPlayedVelocities: (state, key) => {
        state.playedVelocities.push(key);
    },
    setPlayedVelocities: (state, key) => {
        state.playedVelocities = key;
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
    }
}