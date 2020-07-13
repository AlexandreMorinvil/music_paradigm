export default {
    // The player instance
    player: null,

    // The notes being interacted with
    pressedKeys: [],
    midiFileTriggeredKeys: [],

    // Data from the current MIDI file
    midiFile: {
        loaded: false,      // Indicator of whether or not the midi file has been loaded
        name: "",           // Name of the midi file
        notes: {
            midi: [],       // Midi number, e.g. 60 
            time: [],       // (Unused) Time in seconds
            ticks: [],      // (Unused) Time in ticks
            name: [],       // (Unused) Note name, e.g. "C4",
            pitch: [],      // (Unused) The pitch class, e.g. "C",
            octave: [],     // (Unused) The octave, e.g. 4
            velocity: [],   // (Unused) Normalized 0-1 velocity
            duration: [],   // Duration in seconds between noteOn and noteOff
        }
    },

    // Data from the notes played by the user
    played: {
        startTime: 0,
        notes: {
            volume: [],     // Indicator of if the pressed note generated an output
            midi: [],       // Midi number, e.g. 60 
            time: [],       // (Unused) Time in milliseconds (previously called Offset)
            name: [],       // (Unused) Note name, e.g. "C4",
            duration: [],   // Duration in seconds between noteOn and noteOff
            pitch: [],      // (Unused) The pitch class, e.g. "C"
            octave: [],     // (Unused) The octave, e.g. 4
            velocity: [],   // (Unused) Normalized 0-1 velocity
        },

        evaluation: {
            type: "",
            results: null,  // { metric: Type, ... }
            grades: null    // [ { criteria: String, isPassing: Boolean, mark: Number, passMark: Number, topMark: Number} ]
        }
    }
};