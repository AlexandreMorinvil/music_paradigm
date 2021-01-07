<template>
	<div class="pre-session-grid">
		<piano-sound-maker-component style="display: none" ref="piano" />
		<problem-sound-component v-if="hasProblem" v-on:ok="clearProblem" />
		<p class="centered-text">{{ message }}</p>
		<div class="button-layout">
			<button v-on:click="end" class="button center-area" :class="isLastStage ? 'button-start' : 'button-next'">{{ buttonText }}</button>
			<div class="center-content right-area">
				<button v-on:click="indicateHasProblem" class="button button-small button-error">{{ PROBLEM_SOUND }}</button>
			</div>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';

import PianoSoundMakerComponent from '@/components/piano/piano-sound-maker.component.vue';
import ProblemSoundComponent from '@/components/user/problem-prompt/problem-sound.component.vue';

export default {
	components: {
		PianoSoundMakerComponent,
		ProblemSoundComponent,
	},
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			PROBLEM_SOUND: 'I hear no sound?',
			MIDI_NOTE: 48,
			hasProblem: false,
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
		indicateHasProblem() {
			this.hasProblem = true;
		},
		clearProblem() {
			this.hasProblem = false;
		},
	},
	mounted() {
		this.$refs.piano.playNoteInLoop(this.MIDI_NOTE);
	},
};
</script>

<style scoped>
.button-layout {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-template-areas: 'left center right';
}

.center-area {
	grid-area: center;
}

.right-area {
	grid-area: right;
}

.center-content {
	display: flex;
	justify-content: center;
	align-items: center;
}

.button-error {
	width: 60%;
}
</style>
