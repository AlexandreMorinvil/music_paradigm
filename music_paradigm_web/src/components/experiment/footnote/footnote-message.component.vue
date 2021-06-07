<template>
	<p>{{ message }}</p>
</template>

<script>
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';

export default {
	data() {
		return {
			message: '',
		};
	},
	computed: {
		...mapGetters('experiment', ['footnoteMessage']),
	},
	methods: {
		setMessage(message) {
			if (!this.footnoteMessage) this.message = message;
		},
		overrideMessage(message) {
			this.message = message;
		},
	},
	beforeMount() {
		ExperimentEventBus.$on(experimentEvents.EVENT_SET_FOOTNOTE, this.setMessage);
		ExperimentEventBus.$on(experimentEvents.EVENT_OVERIDE_FOOTNOTE, this.overrideMessage);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_SET_FOOTNOTE, this.setMessage);
		ExperimentEventBus.$off(experimentEvents.EVENT_OVERIDE_FOOTNOTE, this.overrideMessage);
	},
	watch: {
		footnoteMessage: {
			immediate: true,
			handler: function () {
				this.message = this.footnoteMessage;
			},
		},
	},
};
</script>

<style scoped></style>
