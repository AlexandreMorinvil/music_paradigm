// This code is put in a function as it is used in more than one mutation
const clearMidiFileNotes = function (state) {
    state.midiFile.notes.midi = [];
    state.midiFile.notes.time = [];
    state.midiFile.notes.ticks = [];
    state.midiFile.notes.name = [];
    state.midiFile.notes.pitch = [];
    state.midiFile.notes.octave = [];
    state.midiFile.notes.velocity = [];
    state.midiFile.notes.duration = [];
}

export default {
    clearMidiFileNotes
}