<template>
	<div class="pre-session-grid">
		<problem-clicker-correspondance-component v-if="hasCorrespondanceProblem" v-on:ok="clearCorrespondanceProblem" />
		<problem-clicker-input-component v-if="hasInputProblem" v-on:ok="clearInputProblem" />
		<clicker-visual-display-component class="visual-clicker" ref="clicker" />
		<p class="centered-text">{{ message }}</p>
		<br/>
		<p v-if="!hasAllKeysInMapping && hasAtLeastOneKeyInMapping" class="centered-text"> {{ note }} </p>
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

import { controllerToMidiMapper } from '@/_helpers';

import ClickerVisualDisplayComponent from '@/components/controller/clicker/clicker-visual-display.component.vue';
import ProblemClickerCorrespondanceComponent from '@/components/user/problem-prompt/problem-clicker-correspondance.component.vue';
import ProblemClickerInputComponent from '@/components/user/problem-prompt/problem-clicker-input.component.vue';

export default {
	components: {
		ClickerVisualDisplayComponent,
		ProblemClickerInputComponent,
		ProblemClickerCorrespondanceComponent,
	},
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	data() {
		return {
			hasReceivedSignal: false,
			hasInputProblem: false,
			hasCorrespondanceProblem: false,
			NUMBER_BUTTONS_ON_CLICKER: 5,
		};
	},
	computed: {
		...mapGetters('session', ['keyboardToMidiInputMapping']),
		...mapGetters('keyboard', ['currentlyPressedKeyboardKeys']),
		message() {
			if (!this.hasClickerMapping) return this.$t('user.pre-session.test-clicker.no-clicker-mapping');
			else return this.$t('user.pre-session.test-clicker.verify-clicker');
		},
		note() {
			return this.$t('user.pre-session.test-clicker.verify-only-yellow-button');
		},
		buttonText() {
			if (this.isWaitingForSignal) return this.$t('user.pre-session.test-clicker.press-yellow-button');
			else if (this.isLastStage) return this.$t('user.pre-session.start-session');
			else return this.$t('user.pre-session.continue');
		},
		buttonStyle() {
			if (this.isWaitingForSignal) return 'button-innactive smaller-text';
			else if (this.isLastStage) return 'button-start';
			else return 'button-next';
		},
		keyboardToClickerButtonInputMapping() {
			return controllerToMidiMapper.getkeyToCickerButtonMapping(this.keyboardToMidiInputMapping);
		},
		keysToHighlightInYellow() {
			return controllerToMidiMapper.getCickerButtonIncludedInMapping(this.keyboardToMidiInputMapping);
		},
		keyboardKeysMapped() {
			return controllerToMidiMapper.getKeyboardKeysHavingCickerButtonMapping(this.keyboardToMidiInputMapping);
		},
		hasAtLeastOneKeyInMapping() {
			return this.keysToHighlightInYellow.length > 0;
		},
		hasAllKeysInMapping() {
			return this.keysToHighlightInYellow.length >= this.NUMBER_BUTTONS_ON_CLICKER;
		},
		hasClickerMapping() {
			return this.hasAtLeastOneKeyInMapping;
		},
		isWaitingForSignal() {
			return this.hasClickerMapping && !this.hasReceivedSignal;
		},
		PROBLEM_SIGNAL() {
			return this.$t('user.pre-session.test-clicker.problem-signal');
		},
		PROBLEM_CORRESPONDANCE() {
			return this.$t('user.pre-session.test-clicker.problem-correspondance');
		},
	},
	methods: {
		advance() {
			if (!this.isWaitingForSignal) this.$emit('end-stage');
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
	mounted() {
		this.$refs.clicker.assignMapping(this.keyboardToClickerButtonInputMapping);
		this.$refs.clicker.imposeIndicatedButtons(this.keysToHighlightInYellow);
	},
	watch: {
		currentlyPressedKeyboardKeys: {
			deep: true,
			handler: function () {
				const hasClickerButtonPressed = this.currentlyPressedKeyboardKeys.some((key) => {
					return this.keyboardKeysMapped.includes(key);
				});
				if (hasClickerButtonPressed) this.hasReceivedSignal = true;
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

.visual-clicker {
	margin: auto;
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
