import state from "./state";

export default {
    // Getter for the player
    player: (state) => {
        return state.player;
    },

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
    midiFileNotesDuration: (state) => {
        return state.midiFile.notes.duration;
    },

    // Getters for the played notes
    // TODO: Erase the ones that are not useful, once you will have cleaned up the Playing.vue from the logging elements
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