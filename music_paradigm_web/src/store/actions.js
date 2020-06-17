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
    setPlayedDurations: ({ commit }, key) => {
        commit('setPlayedDurations', key);
    },
    addPlayedOffsets: ({ commit }, key) => {
        commit('addPlayedOffsets', key);
    },
    setPlayedOffsets: ({ commit }, key) => {
        commit('setPlayedOffsets', key);
    },
    addPlayedVelocities: ({ commit }, key) => {
        commit('addPlayedVelocities', key);
    },
    setPlayedVelocities: ({ commit }, key) => {
        commit('setPlayedVelocities', key);
    },
    setApplicationInitialization: ({ commit }, need) => {
        commit('setApplicationInitialization', need);
    }
}
