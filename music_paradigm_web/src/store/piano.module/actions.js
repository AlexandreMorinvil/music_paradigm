import { ressourceService } from '../../_services';

export default {
    // piano
    setPlayer: ({ commit }, key) => {
        commit('setPlayer', key);
    },
    addPressedKey: ({ commit }, key) => {
        commit('addPressedKey', key);
    },
    deletePressedKey: ({ commit }, key) => {
        commit('deletePressedKey', key);
    },
    addMidiFileTriggeredKey: ({ commit }, key) => {
        commit('addMidiFileTriggeredKey', key);
    },
    deleteMidiFileTriggeredKey: ({ commit }, key) => {
        commit('deleteMidiFileTriggeredKey', key);
    },

    // Log of played notes
    addPressedNoteLog: ({ commit }, key) => {
        commit('addPressedNoteLog', key);
    },

    addReleasedNoteLog: ({ commit }, key) => {
        commit('addReleasedNoteLog', key);
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
