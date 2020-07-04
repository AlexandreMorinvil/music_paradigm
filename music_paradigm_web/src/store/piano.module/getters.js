import state from "./state";

export default {
    // Getters for the current MIDI file data
    midiFileNotes: (state) => {
        return state.midiFile.notes;
    },
    midiFileNotesMidi: (state) => {
        return state.midiFile.notes.midi;
    },
    midiFileNotesDuration: (state) => {
        return state.midiFile.notes.duration;
    },

    // Getters for the played notes
    playedNotes: (state) => {
        return state.played.notes;
    },
    playedNotesMidi: (state) => {
        return state.played.notes.midi;
    },
    playedNotesTime: (state) => {
        return state.played.notes.time;
    },
    playedNotesDuration: () => {
        return state.played.notes.duration;
    },
    playedNotesVelocity: () => {
        return state.played.notes.velocity;
    },

    // Getters for the evaluations
    grades: () => {
        return state.played.evaluation.grades;
    }
}