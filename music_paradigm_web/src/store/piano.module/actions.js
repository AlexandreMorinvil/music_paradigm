import { ressourceService } from '../../_services';

export default {
    // piano
    setPlayer: ({ commit }, key) => {
        commit('setPlayer', key);
    },
    addStarted: ({ commit }, key) => {
        commit('addStarted', key);
    },
    deleteStarted: ({ commit }, key) => {
        commit('deleteStarted', key);
    },

    // Log of played notes
    addPressedNote: ({ commit }, key) => {
        commit('addPressedNote', key);
    },

    addReleasedNote: ({ commit }, key) => {
        commit('addReleasedNote', key);
    },

    addPlayedNotes: ({ commit }, key) => {
        commit('addPlayedNotes', key);
    },
    addPlayedDurations: ({ commit }, key) => {
        commit('addPlayedDurations', key);
    },
    addPlayedOffsets: ({ commit }, key) => {
        commit('addPlayedOffsets', key);
    },
    addPlayedVelocities: ({ commit }, key) => {
        commit('addPlayedVelocities', key);
    },
    resetPlayedNotesLogs: ({ commit }) => {
        commit('resetPlayedNotesLogs');
    },

    // Midi file management
    resetMidiFileData: ({ commit }) => {
        commit('setMidiFileName', "");
        commit('eraseMidiNotes');
    },
    loadMidiFile: ({ commit, dispatch }, midiFileName) => {
        // TODO: Insuring that if the midi file to download is the same, that was already here, we do not redownload it
        dispatch('resetMidiFileData');
        return ressourceService.fetchMidiFile(midiFileName)
            .then(
                response => {
                    commit('setMidiFileName', midiFileName);
                    commit('loadMidiArrayStream', response);
                    commit('parseMidiNotes', response);
                },
                error => { console.error(`Midi file fail:\n${error}`); }
            );
    },
    playMidiFile: ({ commit }) => {
        commit('playMidiFile');
    },

    // Performance evaluation
    evaluateRhythmType: ({ commit }) => {
        commit('evaluateRhythmType');
    },
    evaluateSpeedType: ({ commit }) => {
        commit('evaluateSpeedType');
    }
}
