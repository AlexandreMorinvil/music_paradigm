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
    playMidiFile: ({commit}) => {
        commit('playMidiFile');
    }
}
