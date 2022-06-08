<template>
	<div class="time-left-message" v-show="isToBeDisplayed">{{ message }}</div>
</template>

<script>
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			message: '',
			isToBeDisplayed: false,
			messageDisplayTimeInSeconds: 5,
			timeoutUniqueIndex: null,
		};
	},
	methods: {
		updateMessage(message) {
			clearTimeout(this.timeoutUniqueIndex);
			this.message = message;
			this.isToBeDisplayed = true;
		},
		hideMessage() {
			this.isToBeDisplayed = false;
		},
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_NEW_TIME_LEFT_MESSAGE, this.updateMessage);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_NEW_TIME_LEFT_MESSAGE, this.updateMessage);
	},
	watch: {
		isToBeDisplayed: {
			immediate: true,
			handler: function() {
				if (this.isToBeDisplayed)
					this.timeoutUniqueIndex = setTimeout(this.hideMessage, this.messageDisplayTimeInSeconds * 1000);
			}
		},
	},
};
</script>

<style scoped>
.time-left-message {
	display: flex;
	background: rgb(0, 115, 255);
	text-align: center;
	justify-content: center;
	align-items: center;
	margin: 10px;
	padding: 20px;
	border-radius: 10px;
	opacity: 0.5;
}
</style>
