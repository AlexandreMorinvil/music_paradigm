export default {
    // The player instance
    player: null,

    // The notes started
    starteds: [],

    // Data from the current MIDI file
    midiFile: {
        url: "",
        notes: {
            midi: [],     // Midi number, e.g. 60 
            time: [],     // Time in seconds
            ticks: [],    // Time in ticks
            name: [],     // (Unused) Note name, e.g. "C4",
            pitch: [],    // (Unused) The pitch class, e.g. "C",
            octave : [],  // (Unused) The octave, e.g. 4
            velocity: [], // (Unused) Normalized 0-1 velocity
            duration: [], // Duration in seconds between noteOn and noteOff
        }
    },

    midiFileName: "",
    songNotes: [],
    songDurations: [],

    // Data from the notes played
    playedNotes: [],
    playedDurations: [],
    playedOffsets: [],
    playedVelocities: []
};