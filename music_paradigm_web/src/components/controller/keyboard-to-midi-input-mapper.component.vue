<template>
	<div style="display: none"></div>
</template>

<script>
import { mapGetters } from 'vuex';

import { PianoEventBus, pianoEvents } from '@/event-bus/piano-event-bus.service.js';

export default {
	data() {
		return {
			keyboardTracker: {},
			MAX_VELOCITY: 127,
			MIDI_MESSAGE_CODE_NOTE_ON: 144,
			MIDI_MESSAGE_CODE_NOTE_OFF: 128,
		};
	},
	computed: {
		...mapGetters('experiment', ['hasKeyboardToMidiInputMapping', 'keyboardToMidiInputMapping']),
		hasMapping() {
			return this.hasKeyboardToMidiInputMapping;
		},
		mapping() {
			return this.keyboardToMidiInputMapping;
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
			const note = this.toNote(key);
			// Piano keyUp  => 'Note Off'
			if (!note) return;
			this.keyboardTracker[note] = false;
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_SIMULATED_MIDI_SIGNAL, { data: [this.MIDI_MESSAGE_CODE_NOTE_OFF, note, this.MAX_VELOCITY] });
		},
		initialize() {
			console.log('Here I am');
			if (!this.hasMapping) return;
			window.addEventListener('keydown', this.handleKeyPress);
			window.addEventListener('keyup', this.handleKeyRelease);
		},
		terminate() {
			window.removeEventListener('keydown', this.handleKeyPress);
			window.removeEventListener('keyup', this.handleKeyRelease);
		},
	},
	beforeMount() {
		this.initialize();
	},
	beforeDestroy() {
		this.terminate();
	},
};
</script>

<style></style>
