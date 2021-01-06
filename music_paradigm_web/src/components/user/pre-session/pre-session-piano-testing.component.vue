<template>
	<div class="pre-session-grid">
		<problem-piano-setting-component v-if="hasProblem" v-on:ok="abort" />
		<piano-visual-display-component class="visual-piano" />
		<p class="centered-text">{{ message }}</p>
		<div class="button-layout">
			<div />
			<button v-on:click="advance" class="button" :class="buttonStyle">{{ buttonText }}</button>
			<div>
				<button class="button button-small button-error">Nothing happens when I press any key</button>
				<button class="button button-small button-error">The keys displayed do not correspond</button>
			</div>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';
import { mapGetters } from 'vuex';

import PianoVisualDisplayComponent from '@/components/piano/piano-visual-display.component.vue';
import ProblemPianoSettingComponent from '@/components/user/problem-prompt/problem-piano-setting.component.vue';

export default {
	components: {
		ProblemPianoSettingComponent,
		PianoVisualDisplayComponent,
	},
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			SECONDS_TO_RECEIVE_SIGNAL: 10,
			timeoutUniqueID: 0,
			hasReceivedSignal: false,
			hasProblem: false,
		};
	},
	computed: {
		...mapGetters('piano', ['pressedKeys']),
		message() {
			return 'The piano is now muted: you will not hear any sound.\nVerify that the keys indicated on dislay mirror the keys you press.';
		},
		buttonText() {
			if (!this.hasReceivedSignal) return 'Press a key on the MIDI Keyboard';
			else if (this.isLastStage) return 'Start Session';
			else return 'Continue';
		},
		buttonStyle() {
			if (!this.hasReceivedSignal) return 'button-innactive smaller-text';
			else if (this.isLastStage) return 'button-start';
			else return 'button-next';
		},
	},
	methods: {
		advance() {
			if (this.hasReceivedSignal) this.$emit('end-stage');
		},
		indicateProblem() {
			this.hasProblem = true;
		},
		moveBack() {
			this.$emit('back-stage');
		},
	},
	beforeDestroy() {
		clearTimeout(this.timeoutUniqueID);
	},
	watch: {
		pressedKeys: {
			deep: true,
			handler: function () {
				clearTimeout(this.timeoutUniqueID);
				this.hasReceivedSignal = true;
			},
		},
	},
};
</script>

<style scoped>
.pre-session-flex {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.visual-piano {
	margin: auto;
	height: 225px;
}

.button-layout {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
}

.button-error {
	margin-left: 30px;
	margin-right: 30px;
	width: 60%;
}

.smaller-text {
	font-size: 1.3em;
}

.button {
	margin-top: 20px;
}
</style>
