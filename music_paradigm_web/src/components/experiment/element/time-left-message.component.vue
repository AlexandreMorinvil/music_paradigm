<template>
	<div class="time-left-message" :class="{ flash: isFlashing }">{{ message }}</div>
</template>

<script>
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			message: '',
			isFlashing: false,
		};
	},
	methods: {
		updateMessage(message) {
			this.message = message;
			this.isFlashing = true;
			setTimeout(() => {
				this.isFlashing = false;
			},  2 * 1000);
		},
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_NEW_TIME_LEFT_MESSAGE, this.updateMessage);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_NEW_TIME_LEFT_MESSAGE, this.updateMessage);
	},
};
</script>

<style scoped>
.time-left-message {
	display: flex;
	text-align: center;
	justify-content: center;
	align-items: center;
	margin: 10px;
}

.flash {
	color: red !important;
	background: orange;
	opacity: 0.5;
}
</style>
