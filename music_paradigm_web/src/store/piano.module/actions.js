import { ressourceService } from '../../_services';

export default {
    setSongNum: ({ commit }, key) => { // to be changed to module
        commit('setSongNum', key);
    },

    // piano
    addStarted: ({ commit }, key) => {
        commit('addStarted', key);
    },
    deleteStarted: ({ commit }, key) => {
        commit('deleteStarted', key);
    },
    setPlayer: ({ commit }, key) => {
        commit('setPlayer', key);
    },

    // For the midi files
    addSongNotes: ({ commit }, key) => {
        commit('addSongNotes', key);
    },
    addSongDurations: ({ commit }, key) => {
        commit('addSongDurations', key);
    },

    // for logging
    addPlayedNotes: ({ commit }, key) => {
        commit('addPlayedNotes', key);
    },
    setPlayedNotes: ({ commit }, key) => {
        commit('setPlayedNotes', key);
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

    resetSongData: ({ commit }) => {
        commit('setSongNotes', []);
        commit('setSongDurations', []);
    },
    resetPlayedNotesLogs: ({ commit }) => {
        commit('setPlayedNotes', []);
        commit('setPlayedDurations', []);
        commit('setPlayedOffsets', []);
        commit('setPlayedVelocities', []);
    },

    // Midi file management
    loadMidiFile: ({ commit }, midiFileName) => {
        ressourceService.fetchMidiFile(midiFileName)
            .then(
                response => {
                    commit('setMidiFileName', midiFileName);
                    commit('loadMidiArrayStream', response);
                    commit('parseMidiNotes', response);
                },
                error => { console.error(`Midi file fail:\n${error}`); }
            );
    },
}
