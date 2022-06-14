<template>
	<div id="grid-loaction-task-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-target-area-component class="image-target-area state-section" />
		<image-matrix-area-component class="image-matrix-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import ImageMatrixAreaComponent from '@/components/experiment/visual-content/image-matrix-area.component.vue';
import ImageTargetAreaComponent from '@/components/experiment/visual-content/image-target-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageTargetAreaComponent,
		ImageMatrixAreaComponent,
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
}

.image-target-area {
	flex-grow: 1;
}

.image-matrix-area {
	flex-grow: 1;
}
</style>
