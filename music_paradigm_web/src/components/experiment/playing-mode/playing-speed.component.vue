<template>
	<div id="playing-speed-area" class="playing-area">
		<div id="playing-progress-bar" class="playing-progress-bar-area">
			<progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
		</div>
	</div>
</template>

<script>
import '@/styles/playing-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			playingStarted: false,
			defaultTimeLimitInSeconds: 30,
			counterUniqueIdentifier: 0,
			referenceTime: 0,
			playProgress: 0,
			timeStepInMilliseconds: 100,
			timeLeftInMilliseconds: 0,
			minMelodyRepetitionDisplayed: 20,
		};
	},
	computed: {
		...mapGetters('experiment', ['timeoutInSeconds', 'melodyRepetition', 'isWaitingStartSignal']),
		...mapGetters('piano', ['midiFileNotesMidi', 'playedNotesMidi']),
		timeLimit() {
			return this.timeoutInSeconds || this.defaultTimeLimitInSeconds;
		},
		maxPlayProgress() {
			const factor = Math.max(this.minMelodyRepetitionDisplayed, this.melodyRepetition);
			return this.midiFileNotesMidi.length * factor;
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
		...mapActions('piano', ['evaluateSpeedType']),
		start() {
			this.startCountdown();
			this.playingStarted = true;
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
		playedNotesMidi() {
			if (this.isWaitingStartSignal) return;
			else if (!this.playingStarted) this.start();
			else if (this.midiFileNotesMidi.includes(this.playedNotesMidi[this.playedNotesMidi.length - 1])) this.playProgress += 1;
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
