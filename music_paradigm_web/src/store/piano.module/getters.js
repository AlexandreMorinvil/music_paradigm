import state from "./state";

export default {
    // Getter for the piano initialization status
    isPianoInitialized: (state) => {
        return state.isPianoInitialized;
    },

    // Getteer for the Midi File loading status
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
    },

    hasSuccess: (state) => {
        if (state.played.evaluation.grades.length <= 0) return false;
        for (let grade of state.played.evaluation.grades) {
            if (grade.mark < grade.passMark) return false;
        }
        return true;
    },

    pianoSimpleLogSummary: (state) => {
        return {
            referenceName: state.midiFile.name,
            referenceMidi: state.midiFile.notes.midi,
            referenceTime: state.midiFile.notes.time,
            referenceDuration: state.midiFile.notes.duration,
            referenceVelocity: state.midiFile.notes.velocity,

            playedStartTime: state.played.startTime,
            playedMidi: state.played.notes.midi,
            playedTime: state.played.notes.time,
            playedVelocity: state.played.notes.velocity,
            playedDuration: state.played.notes.duration,
        }
    },

    pianoSimpleLogPreprocesed: (state) => {
        return {
            ...state.played.evaluation.results
        }
    },

    pianoLogSummary: (state) => {
        return {
            reference: {
                name: state.midiFile.name,
                midi: state.midiFile.notes.midi,
                time: state.midiFile.notes.time,
                duration: state.midiFile.notes.duration,
                velocity: state.midiFile.notes.velocity,
            },
            played: {
                startTime: state.played.startTime,
                // volume: state.played.notes.volume,
                midi: state.played.notes.midi,
                time: state.played.notes.time,
                velocity: state.played.notes.velocity,
                duration: state.played.notes.duration,
            },
            evaluation: {
                type: state.played.evaluation.type,
                grades: state.played.evaluation.grades
            },
            preprocessedMetrics: state.played.evaluation.results
        }
    }
}