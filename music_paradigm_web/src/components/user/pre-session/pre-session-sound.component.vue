<template>
	<div class="pre-session-grid">
		<piano-sound-maker-component style="display: none" ref="piano" />
		<p class="centered-text">{{ message }}</p>
		<div>
			<button v-on:click="end" class="button" :class="isLastStage ? 'button-start' : 'button-next'">{{ buttonText }}</button>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';

import PianoSoundMakerComponent from '@/components/piano/piano-sound-maker.component.vue';

export default {
	components: {
		PianoSoundMakerComponent,
	},
	props: {
		isLastStage: {
			MIDI_NOTE: 50,
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			message: 'You should now hear a piano sound.\n\nPlease Adjust the volume to a confortable level.',
		};
	},
	computed: {
		buttonText() {
			if (this.isLastStage) return 'Start Session';
			else return 'Continue';
		},
	},
	methods: {
		end() {
			this.$emit('end-stage');
		},
	},
	mounted() {
		this.$refs.piano.playNoteInLoop(this.MIDI_NOTE);
	},
};
</script>

<style scoped></style>
