<template>
	<div style="display: none"></div>
</template>

<script>
import { mapGetters } from 'vuex';

import { PianoEventBus, pianoEvents } from '@/event-bus/piano-event-bus.service.js';

export default {
	data() {
		return {
			currentOctave: 4,
			keyboardTracker: {},

			MAX_VELOCITY: 127,
			MIDI_MESSAGE_CODE_NOTE_ON: 144,
			MIDI_MESSAGE_CODE_NOTE_OFF: 128,

			NOTES_PER_OCTAVE: 12,
			MIN_OCTAVE: 0,
			MAX_OCTAVE: 12,
		};
	},
	computed: {
		...mapGetters('piano', ['isPianoInitialized']),
		...mapGetters('account', ['isAdmin']),
		mapping() {
			return {
				a: 48,
				w: 49,
				s: 50,
				e: 51,
				d: 52,
				f: 53,
				t: 54,
				g: 55,
				y: 56,
				h: 57,
				u: 58,
				j: 59,
				k: 60,
				o: 61,
				l: 62,
			};
		},
	},
	methods: {
		toNote(e) {
			return this.mapping[e.key];
		},
		handleKeyPress(key) {
			const note = this.toNote(key);
			// PianokeyDown => 'Note On'
			// If the key doesn't exist in the midi mapping, or we're trying to send a noteOn event without having most recently sent a noteOff, end here.
			if (!note || this.keyboardTracker[note]) return;
			this.keyboardTracker[note] = true;
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_SIMULATED_MIDI_SIGNAL, { data: [this.MIDI_MESSAGE_CODE_NOTE_ON, note, this.MAX_VELOCITY] });
		},
		handleKeyRelease(key) {
			switch (key.code) {
				// Octave down
				case 'ShiftLeft': {
					this.currentOctave = Math.max(this.MIN_OCTAVE, this.currentOctave - 1);
					for (const mapKey in this.mapping) {
						if (mapKey !== ' ') this.mapping[mapKey] -= this.NOTES_PER_OCTAVE;
					}
					break;
				}
				// Octave up
				case 'ShiftRight': {
					this.currentOctave = Math.min(this.MAX_OCTAVE, this.currentOctave + 1);
					for (const mapKey in this.mapping) {
						if (mapKey !== ' ') this.mapping[mapKey] += this.NOTES_PER_OCTAVE;
					}
					break;
				}
				// Piano keyUp  => 'Note Off'
				default: {
					const note = this.toNote(key);
					if (!note) return;
					this.keyboardTracker[note] = false;
					PianoEventBus.$emit(pianoEvents.EVENT_PIANO_SIMULATED_MIDI_SIGNAL, { data: [this.MIDI_MESSAGE_CODE_NOTE_OFF, note, this.MAX_VELOCITY] });
				}
			}
		},
		initialize() {
			// If the current user is not and admin, we do not activate the substitue computer keyboard
			if (!this.isAdmin) return;
			window.addEventListener('keydown', this.handleKeyPress);
			window.addEventListener('keyup', this.handleKeyRelease);
		},
		terminate() {
			window.removeEventListener('keydown', this.handleKeyPress);
			window.removeEventListener('keyup', this.handleKeyRelease);
		},
	},
	beforeDestroy() {
		this.terminate();
	},
	watch: {
		isPianoInitialized: {
			immediate: true,
			handler: function (isPianoInitialized) {
				if (isPianoInitialized) this.initialize();
				else this.terminate();
			},
		},
	},
};
</script>

<style></style>
