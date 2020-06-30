export default {
    // The player instance
    player: null,

    // The notes started
    starteds: [],

    // Data from the current MIDI file
    midiFile: {
        name: "",
        notes: {
            midi: [],     // Midi number, e.g. 60 
            time: [],     // (Unused) Time in seconds
            ticks: [],    // (Unused) Time in ticks
            name: [],     // (Unused) Note name, e.g. "C4",
            pitch: [],    // (Unused) The pitch class, e.g. "C",
            octave: [],   // (Unused) The octave, e.g. 4
            velocity: [], // (Unused) Normalized 0-1 velocity
            duration: [], // Duration in seconds between noteOn and noteOff
        }
    },

    // Data from the notes played by the user
    played: {
        notes: {
            midi: [],       // Midi number, e.g. 60 
            time: [],       // Time in milliseconds (previously called Offset)
            duration: [],   // Duration in seconds between noteOn and noteOff
            velocity: [],   // (Not working) Normalized 0-1 velocity, currently the velocity is always 1
        }
    }
};