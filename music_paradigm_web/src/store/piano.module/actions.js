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


    resetPlayedNotesLogs: ({ commit }) => {
        commit('setPlayedNotes', []);
        commit('setPlayedDurations', []);
        commit('setPlayedOffsets', []);
        commit('setPlayedVelocities', []);
    },

    // Midi file management
    resetMidiFileData: ({ commit }) => {
        commit('setMidiFileName', "");
        commit('eraseMidiNotes');
    },
    loadMidiFile: ({ commit, dispatch }, midiFileName) => {
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
    playMidiFile: ({commit}) => {
        commit('playMidiFile');
    }
}
