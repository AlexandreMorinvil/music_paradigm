import router from '@/router'

export default {
    // appendPet: (state, { species, pet }) => {
    //   state[species].push(pet)
    // }
    setSongNum: (state, key) => {
        state.songNum = key;
    },
    addStarted: (state, key) => {
        state.starteds.push(key);
    },
    deleteStarted: (state, key) => {
        const selectedIndex = state.starteds.indexOf(key);
        if (selectedIndex !== -1) state.starteds.splice(selectedIndex, 1);
        // delete state.started[key]
    },
    setPlayer: (state, key) => {
        state.player = key;
    },
    addSongNotes: (state, key) => {
        state.songNotes.push(key);
    },
    setSongNotes: (state, key) => {
        state.songNotes = key;
    },
    addSongDurations: (state, key) => {
        state.songDurations.push(key);
    },
    setSongDurations: (state, key) => {
        state.songDurations = key;
    },
    addPlayedNotes: (state, key) => {
        state.playedNotes.push(key);
    },
    setPlayedNotes: (state, key) => {
        state.playedNotes = key;
    },
    addPlayedDurations: (state, key) => {
        state.playedDurations.push(key);
    },
    setPlayedDurations: (state, key) => {
        state.playedDurations = key;
    },
    addPlayedOffsets: (state, key) => {
        state.playedOffsets.push(key);
    },
    setPlayedOffsets: (state, key) => {
        state.playedOffsets = key;
    },
    addPlayedVelocities: (state, key) => {
        state.playedVelocities.push(key);
    },
    setPlayedVelocities: (state, key) => {
        state.playedVelocities = key;
    }
}
