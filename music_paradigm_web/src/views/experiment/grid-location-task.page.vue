<template>
	<div id="grid-loaction-task-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<grid-location-task-grid-area-component class="grid-location-task-grid-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import GridLocationTaskGridAreaComponent from '@/components/experiment/visual-content/grid-location-task-grid-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		GridLocationTaskGridAreaComponent,
		TextAreaComponent,
	},
	props: {},
	computed: {},
	methods: {
		updateFootnote() {
			const footnoteMessage = this.$t('views.experiment.grid-location-task.footnote');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
	}
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 10%;
}

.grid-location-task-grid-area {
	flex-grow: 1;
	height: 90%;
}
</style>
