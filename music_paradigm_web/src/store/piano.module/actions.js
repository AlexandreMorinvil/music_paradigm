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

    // for logging
    addSongNotes: ({ commit }, key) => {
        commit('addSongNotes', key);
    },
    setSongNotes: ({ commit }, key) => {
        commit('setSongNotes', key);
    },
    addSongDurations: ({ commit }, key) => {
        commit('addSongDurations', key);
    },
    setSongDurations: ({ commit }, key) => {
        commit('setSongDurations', key);
    },
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

    // For logging 2
    resetPlayedNotesLogs: ({ commit }) => {
        commit('setPlayedNotes', []);
        commit('setPlayedDurations', []);
        commit('setPlayedOffsets', []);
        commit('setPlayedVelocities', []);
    }
}
