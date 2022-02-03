<template>
	<div class="pre-session-grid">
		<problem-piano-correspondance-component v-if="hasCorrespondanceProblem" v-on:ok="clearCorrespondanceProblem" />
		<problem-piano-input-component v-if="hasInputProblem" v-on:ok="clearInputProblem" />
		<piano-visual-display-component class="visual-piano" />
		<p class="centered-text">{{ message }}</p>
		<div class="button-layout">
			<button v-on:click="advance" class="button center-area" :class="buttonStyle">{{ buttonText }}</button>
			<div class="center-content right-area">
				<button v-on:click="indicateInputProblem" v-if="!hasReceivedSignal" class="button button-small button-error">{{ PROBLEM_SIGNAL }}</button>
				<button v-on:click="indicateCorrespondanceProblem" v-else class="button button-small button-error">{{ PROBLEM_CORRESPONDANCE }}</button>
			</div>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';
import { mapGetters } from 'vuex';

import PianoVisualDisplayComponent from '@/components/controller/piano/piano-visual-display.component.vue';
import ProblemPianoCorrespondanceComponent from '@/components/user/problem-prompt/problem-piano-correspondance.component.vue';
import ProblemPianoInputComponent from '@/components/user/problem-prompt/problem-piano-input.component.vue';

export default {
	components: {
		PianoVisualDisplayComponent,
		ProblemPianoInputComponent,
		ProblemPianoCorrespondanceComponent,
	},
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			timeoutUniqueID: 0,
			hasReceivedSignal: false,
			hasInputProblem: false,
			hasCorrespondanceProblem: false,
		};
	},
	computed: {
		...mapGetters('piano', ['pressedKeys']),
		message() {
			return this.$t('user.pre-session.test-piano.verify-piano');
		},
		buttonText() {
			if (!this.hasReceivedSignal) return this.$t('user.pre-session.test-piano.press-any-key');
			else if (this.isLastStage) return this.$t('user.pre-session.start-session');
			else return this.$t('user.pre-session.continue');
		},
		buttonStyle() {
			if (!this.hasReceivedSignal) return 'button-innactive smaller-text';
			else if (this.isLastStage) return 'button-start';
			else return 'button-next';
		},
		PROBLEM_SIGNAL() {
			return this.$t('user.pre-session.test-piano.problem-signal');
		},
		PROBLEM_CORRESPONDANCE() {
			return this.$t('user.pre-session.test-piano.problem-correspondance');
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
		indicateInputProblem() {
			this.hasInputProblem = true;
		},
		indicateCorrespondanceProblem() {
			this.hasCorrespondanceProblem = true;
		},
		clearInputProblem() {
			this.$emit('back-stage');
			this.hasInputProblem = false;
		},
		clearCorrespondanceProblem() {
			this.hasCorrespondanceProblem = false;
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

.smaller-text {
	font-size: 1.3em;
}

.button {
	margin-top: 20px;
}
</style>
