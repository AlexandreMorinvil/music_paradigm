<template>
	<div class="pre-session-flex">
		<img src="plug-usb.gif" style="margin: auto" alt="plug usb cable" />
		<p class="centered-text">{{ message }}</p>
		<div>
			<button v-on:click="advance" class="button" :class="isLastStage ? 'button-start' : 'button-next'">{{ buttonText }}</button>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';

import { KeyboardEventBus, keyboardEvents } from '@/event-bus/keyboard-event-bus.service.js';

export default {
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		message() {
			return this.$t('user.pre-session.attach-clicker.attach-clicker');
		},
		buttonText() {
			if (this.isLastStage) return this.$t('user.pre-session.start-session');
			else return this.$t('user.pre-session.attach-clicker.initialize-clicker');
		},
	},
	methods: {
		advance() {
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_INIT_REQUEST);
			this.$emit('end-stage');
		},
	},
	beforeMount() {
		// Deactivate any previous instance of a keyboard tracker to prevent any unexpected behavior
		KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST);
	},
};
</script>

<style scoped>
.pre-session-flex {
	display: flex;
	flex-direction: column;
}

img {
	height: 190px;
	width: auto;
}

button {
	margin-top: 20px;
}
</style>
