import state from "./state";

export default {
    experimentName: (state) => {
        return "UNKNOWN_NAME";
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
    }
}