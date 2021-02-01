<template>
	<div id="timer-display" :class="color">
		<svg v-if="mustCountDown" class="timer-icon">
			<use xlink:href="sprites.svg#icon-hourglass" />
		</svg>
		<svg v-else class="timer-icon">
			<use xlink:href="sprites.svg#icon-timer" />
		</svg>
		&nbsp;{{ timerDisplay }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

export default {
	components: {},
	data() {
		return {
			turnedOn: false,
			counterUniqueIdentifier: 0,
			timeStepInMilliseconds: 1000,
			referenceTime: 0,
			totalTime: 0,
			cumulatedTime: 0,
			seconds: 0,
			minutes: 0,
			hours: 0,
			days: 0,
		};
	},
	computed: {
		...mapGetters('experiment', ['timeLimitInSeconds']),
		color() {
			return this.turnedOn ? 'active' : 'inactive';
		},
		mustCountDown() {
			return this.timeLimitInSeconds > 0;
		},
		timerDisplay() {
			let hours = '';
			if (this.hours > 0) hours = (this.hours < 10 ? '0' + this.hours : this.hours) + ':';
			return hours + (this.minutes < 10 ? '0' + this.minutes : this.minutes) + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
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
			this.turnedOn = true;
		},
		stopTimer() {
			window.clearInterval(this.counterUniqueIdentifier);
			this.cumulatedTime = this.updateTimer();
			this.turnedOn = false;
		},
		updateTimer() {
			this.mustCountDown ? this.countDown() : this.countUp();
			return this.totalTime;
		},
		countUp() {
			this.totalTime = this.cumulatedTime + Date.parse(new Date()) - Date.parse(this.referenceTime);
		},
		countDown() {
			this.totalTime = this.cumulatedTime - (Date.parse(new Date()) - Date.parse(this.referenceTime));
		},
	},
	mounted() {
		this.setTime(this.timeLimitInSeconds);
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		totalTime(value) {
			if (value < 0) {
				this.setTime(0);
				this.stopTimer();
				ExperimentEventBus.$emit(experimentEvents.EVENT_TIMES_UP);
			} else {
				this.seconds = Math.floor((value / 1000) % 60);
				this.minutes = Math.floor((value / 1000 / 60) % 60);
				this.hours = Math.floor((value / (1000 * 60 * 60)) % 24);
				this.days = Math.floor(value / (1000 * 60 * 60 * 24));
			}
		},
	},
};
</script>

<style scoped>
#timer-display {
	display: flex;
	align-items: center;
	justify-content: center;
	min-width: 200px;
	height: 85%;
}
.timer-icon {
	display: inline-block;
	stroke-width: 0;
	min-width: 30px;
	width: 30px;
	height: 30px;
}
.active {
	stroke: rgb(220, 220, 220);
	fill: rgb(220, 220, 220);
	color: rgb(220, 220, 220);
}
.inactive {
	stroke: rgb(100, 100, 100);
	fill: rgb(100, 100, 100);
	color: rgb(100, 100, 100);
}
</style>
