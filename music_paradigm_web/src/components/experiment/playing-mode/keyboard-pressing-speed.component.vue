<template>
	<div id="pressing-speed-area" class="playing-area">
		<div id="playing-progress-bar" class="playing-progress-bar-area">
			<progress id="progress-bar" :value="pressProgress" :max="maxPlayProgress"></progress>
		</div>
	</div>
</template>

<script>
import '@/styles/playing-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			pressingStarted: false,
			defaultTimeLimitInSeconds: 30,
			counterUniqueIdentifier: 0,
			referenceTime: 0,
			pressProgress: 0,
			timeStepInMilliseconds: 100,
			timeLeftInMilliseconds: 0,
			minMelodyRepetitionDisplayed: 20,
		};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['timeoutInSeconds', 'melodyRepetition', 'isWaitingStartSignal']),
		...mapGetters('keyboard', ['referenceKeyboardKeys', 'pressedKeyboardKeys']),
		timeLimit() {
			return this.timeoutInSeconds || this.defaultTimeLimitInSeconds;
		},
		maxPlayProgress() {
			const factor = Math.max(this.minMelodyRepetitionDisplayed, this.melodyRepetition);
			return this.referenceKeyboardKeys.length * factor;
		},
		timeLimitInMiliseconds() {
			return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
		},
		timeLeftDisplay() {
			let display = '';
			const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
			const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
			if (minutes > 0) {
				display += this.$tc('experiment.playing-mode.speed.minute', minutes, { minute: minutes });
			}
			display += this.$tc('experiment.playing-mode.speed.second', seconds, { second: seconds });
			return display;
		},
	},
	methods: {
		...mapActions('keyboard', ['evaluateSpeedType']),
		start() {
			this.startCountdown();
			this.pressingStarted = true;
		},
		startCountdown() {
			this.referenceTime = Date.parse(new Date());
			this.counterUniqueIdentifier = window.setInterval(this.countdown, this.timeStepInMilliseconds);
		},
		countdown() {
			this.timeLeftInMilliseconds = Math.max(this.timeLimitInMiliseconds - (Date.now() - this.referenceTime), 0);
		},
		updateFootnote(firstNotePressed) {
			let footnoteMessage = '';
			if (firstNotePressed) footnoteMessage = this.$t('experiment.playing-mode.speed.footnote-after-time', { time: this.timeLeftDisplay });
			else footnoteMessage = this.$t('experiment.playing-mode.speed.footnote-start-after-press');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		evaluate() {
			this.evaluateSpeedType();
		},
	},
	mounted() {
		this.updateFootnote(false);
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		pressedKeyboardKeys() {
			if (this.isWaitingStartSignal) return;
			else if (!this.pressingStarted) this.start();
			else if (this.referenceKeyboardKeys.includes(this.pressedKeyboardKeys[this.pressedKeyboardKeys.length - 1])) this.pressProgress += 1;
		},
		timeLeftInMilliseconds(value) {
			// When the time is over we indicate the end of the playing state
			if (value <= 0) this.$emit('finished-playing');
			else this.updateFootnote(true);
		},
	},
};
</script>

<style scoped></style>
