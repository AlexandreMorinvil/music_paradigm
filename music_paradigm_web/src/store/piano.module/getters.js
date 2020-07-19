import state from "./state";

export default {
    // Midi file for the midiFile loading status
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
    midiFileNotesDuration: (state) => {
        return state.midiFile.notes.duration;
    },

    // Getters for the played notes
    playedNotesMidi: (state) => {
        return state.played.notes.midi;
    },

    // Getters for the evaluations
    grades: () => {
        return state.played.evaluation.grades;
    }
}