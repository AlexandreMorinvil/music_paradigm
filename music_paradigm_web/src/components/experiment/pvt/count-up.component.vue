<template>
	<div id="pvt-count-up" :class="color" class="pvt-count-up">
		<span>{{ timerDisplay }}</span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	components: {},
	props: {},
	data() {
		return {
			isCounting: false,
			counterUniqueIdentifier: 0,
			timeStepInMilliseconds: 5,
			referenceTime: 0,
			totalTime: 0,
		};
	},
	computed: {
		...mapGetters('experiment', ['maxResponseTime']),
		color() {
			return !this.isCounting && 'frozen';
		},
		upperLimit() {
			return this.maxResponseTime;
		},
		timerDisplay() {
			return this.totalTime;
		},
	},
	methods: {
		setTime(value) {
			this.totalTime = value;
			this.referenceTime = new Date();
		},
		startTimer() {
			this.referenceTime = new Date();
			this.counterUniqueIdentifier = window.setInterval(this.countUp, this.timeStepInMilliseconds);
			this.countUp();
			this.isCounting = true;
		},
		stopTimer() {
			window.clearInterval(this.counterUniqueIdentifier);
			this.isCounting = false;
			this.$emit('pvtReacted', this.totalTime);
		},
		countUp() {
			this.totalTime = new Date().getTime() - this.referenceTime.getTime();
		},
	},
	beforeMount() {
		this.setTime(0);
	},
	mounted() {
		this.startTimer();
	},
	beforeDestroy() {
		window.clearInterval(this.counterUniqueIdentifier);
	},
	watch: {
		totalTime(value) {
			if (value > this.upperLimit) {
				this.stopTimer();
				this.setTime(this.upperLimit);
			}
		},
	},
};
</script>

<style scoped>
.pvt-count-up {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3em;
}

.frozen {
	color: yellow;
}
</style>
