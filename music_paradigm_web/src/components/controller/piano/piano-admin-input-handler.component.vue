<template>
	<div style="display: none"></div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			currentOctave: 4,
			keyboardTracker: {},
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
			this.$emit('simulated-midi-signal', { data: [144, note, 127] });
		},
		handleKeyRelease(key) {
			switch (key.code) {
				// Octave down
				case 'ShiftLeft': {
					this.currentOctave = Math.max(0, this.currentOctave - 1);
					for (const mapKey in this.mapping) {
						if (mapKey !== ' ') this.mapping[mapKey] -= 12;
					}
					break;
				}
				// Octave up
				case 'ShiftRight': {
					this.currentOctave = Math.min(12, this.currentOctave + 1);
					for (const mapKey in this.mapping) {
						if (mapKey !== ' ') this.mapping[mapKey] += 12;
					}
					break;
				}
				// Piano keyUp  => 'Note Off'
				default: {
					const note = this.toNote(key);
					if (note) {
						this.keyboardTracker[note] = false;
						this.$emit('simulated-midi-signal', { data: [128, note, 127] });
					}
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
