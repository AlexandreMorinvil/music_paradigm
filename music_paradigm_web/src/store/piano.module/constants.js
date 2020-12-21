const DEFAULT_PIANO_STATE_VALUES = function() {
	return{
		// Indicator of whether or not the virtual piano is ready to be used
		isPianoInitialized: false,

		// The player instance
		player: null,

		// The notes being interacted with
		pressedKeys: [],
		midiFileTriggeredKeys: [],

		// Data from the current MIDI file
		midiFile: {
			isLoaded: false, // Indicator of whether or not the midi file has been loaded
			name: '', // Name of the midi file
			notes: {
				midi: [], // Midi number, e.g. 60
				time: [], // Time in seconds
				name: [], // (Unused) Note name, e.g. "C4",
				pitch: [], // (Unused) The pitch class, e.g. "C",
				octave: [], // (Unused) The octave, e.g. 4
				velocity: [], // (Unused) Normalized 0-1 velocity
				duration: [] // Duration in seconds between noteOn and noteOff
			}
		},

		// Data from the notes played by the user
		played: {
			startTime: 0, // Time in milliseconds of the first note
			notes: {
				volume: [], // Indicator of if the pressed note generated an output
				midi: [], // Midi number, e.g. 60
				time: [], // (Unused) Time in milliseconds (previously called Offset)
				name: [], // (Unused) Note name, e.g. "C4",
				duration: [], // Duration in seconds between noteOn and noteOff
				pitch: [], // (Unused) The pitch class, e.g. "C"
				octave: [], // (Unused) The octave, e.g. 4
				velocity: [] // (Unused) Normalized 0-1 velocity
			},

			evaluation: {
				type: '',
				results: null, // { metric: Type, ... }
				grades: null // [ { criteria: String, isPassing: Boolean, mark: Number, passMark: Number, topMark: Number} ]
			}
		}
	};
};

export default{
	DEFAULT_PIANO_STATE_VALUES
};
