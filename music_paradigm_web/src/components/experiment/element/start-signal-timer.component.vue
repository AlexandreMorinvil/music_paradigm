<template>
	<div v-if="isSignalBeingWaited" id="signal">{{ $t('experiment.element.start-signal-timer.start-in') }}<br />{{ timerDisplay }}</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			isSignalBeingWaited: true,
			soundCount: null,
			soundStart: null,
			VOLUME_LEVEL: 0.05,
			counterUniqueIdentifier: 0,
			timeStepInMilliseconds: 1000,
			referenceTime: 0,
			totalTime: 0,
			cumulatedTime: 0,
			seconds: 0,
		};
	},
	computed: {
		...mapGetters('experiment', ['isWaitingStartSignal', 'startSignal']),
		timerDisplay() {
			return this.seconds || 'Start';
		},
	},
	methods: {
		...mapActions('experiment', ['stopWaitingStartSignalReady']),
		...mapActions('piano', ['pausePiano', 'unPausePiano']),
		setTime(value) {
			this.cumulatedTime = value * 1000;
			this.totalTime = this.cumulatedTime;
			this.referenceTime = new Date();
		},
		startTimer() {
			this.referenceTime = new Date();
			this.counterUniqueIdentifier = window.setInterval(this.updateTimer, this.timeStepInMilliseconds);
			this.updateTimer();
		},
		updateTimer() {
			this.countDown();
			return this.totalTime;
		},
		countDown() {
			this.totalTime = this.cumulatedTime - (Date.parse(new Date()) - Date.parse(this.referenceTime));
		},
		sendStartSignal() {
			window.clearInterval(this.counterUniqueIdentifier);
			this.soundStart.play();
			this.unPausePiano();
			ExperimentEventBus.$emit(experimentEvents.EVENT_START_SIGNAL_READY);
			this.stopWaitingStartSignalReady();
			this.setTime(0);
			this.isSignalBeingWaited = false;
		},
	},
	mounted() {
		this.soundCount = new Audio('beep-count.wav');
		this.soundStart = new Audio('beep-start.wav');
		this.soundCount.volume = this.VOLUME_LEVEL;
		this.soundStart.volume = this.VOLUME_LEVEL;
		this.setTime(this.startSignal);
		if (this.isWaitingStartSignal) {
			this.pausePiano();
			this.startTimer();
		}
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		totalTime(value) {
			if (value <= 0) {
				this.sendStartSignal();
			} else {
				this.seconds = Math.floor(value / 1000);
				this.soundCount.play();
			}
		},
	},
};
</script>

<style scoped></style>
