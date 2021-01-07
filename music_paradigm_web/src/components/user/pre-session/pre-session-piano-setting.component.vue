<template>
	<div class="pre-session-flex">
		<problem-piano-setting-component v-if="hasProblem" v-on:ok="abort" />
		<img src="plug-usb.gif" style="margin: auto" alt="plug usb cable" />
		<p class="centered-text">{{ message }}</p>
		<div>
			<button v-on:click="advance" class="button" :class="isLastStage ? 'button-start' : 'button-next'">{{ buttonText }}</button>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';
import { mapGetters } from 'vuex';

import { PianoEventBus, pianoEvents } from '@/_services/piano-event-bus.service.js';
import ProblemPianoSettingComponent from '@/components/user/problem-prompt/problem-piano-setting.component.vue';

export default {
	components: {
		ProblemPianoSettingComponent,
	},
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			SECONDS_TO_INITIALIZE_PIANO: 10,
			timeoutUniqueID: 0,
			hasProblem: false,
		};
	},
	computed: {
		...mapGetters('piano', ['isPianoInitializing', 'isPianoInitialized']),
		message() {
			return (
				'Please attach the MIDI-keyboard to your computer using the USB-chord and place it so you can play it comfortably.\n\n' +
				'When done, press the button below'
			);
		},
		buttonText() {
			if (this.isPianoInitializing) return 'Initializing...';
			if (this.isLastStage) return 'Start Session';
			else return 'Initialize MIDI';
		},
	},
	methods: {
		advance() {
			if (this.isPianoInitialized) this.$emit('end-stage');
			else {
				PianoEventBus.$emit(pianoEvents.EVENT_PIANO_INIT_REQUEST);
				this.timeoutUniqueID = setTimeout(this.indicateProblem, this.SECONDS_TO_INITIALIZE_PIANO * 1000);
			}
		},
		indicateProblem() {
			this.hasProblem = true;
		},
		abort() {
			this.$emit('abort');
		},
	},
	beforeMount() {
		// Deactivate any previous instance of a piano to prevent any unexpected behavior
		PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
	},
	beforeDestroy() {
		clearTimeout(this.timeoutUniqueID);
	},
	watch: {
		isPianoInitialized(isInitialized) {
			if (isInitialized) this.$emit('end-stage');
		},
	},
};
</script>

<style scoped>
.pre-session-flex {
	display: flex;
	flex-direction: column;
}

img {
	height: 190px;
	width: auto;
}

button {
	margin-top: 20px;
}
</style>
