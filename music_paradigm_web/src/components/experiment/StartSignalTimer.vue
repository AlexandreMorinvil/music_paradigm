<template>
	<div id="signal">
		{{ timerDisplay }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus } from '@/_services/eventBus.service.js';

export default {
	data() {
		return {
			soundCount: null,
			soundStart: null,
			counterUniqueIdentifier: 0,
			timeStepInMilliseconds: 1000,
			referenceTime: 0,
			totalTime: 0,
			cumulatedTime: 0,
			seconds: 0,
		};
	},
	computed: {
		...mapGetters('experiment', ['startSignal']),
		timerDisplay() {
			return this.seconds || 'Start';
		},
	},
	methods: {
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
	},
	mounted() {
		this.soundCount = new Audio('beep-count.wav');
		this.soundStart = new Audio('beep-start.wav');
		this.setTime(this.startSignal);
		this.startTimer();
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		totalTime(value) {
			if (value <= 0) {
				window.clearInterval(this.counterUniqueIdentifier);
				this.soundStart.play();
				ExperimentEventBus.$emit('start-signal-ready');
				this.setTime(0);
			} else {
				this.seconds = Math.floor(value / 1000);
				this.soundCount.play();
			}
		},
	},
};
</script>

<style scoped></style>
