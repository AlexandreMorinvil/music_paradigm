<template>
	<div id="instruction-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		TextAreaComponent,
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return '';
			},
		},
		isSpaceBarPressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	computed: {
		...mapGetters('experiment', ['']),
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = this.$t('views.experiment.instruction.footnote-press-any-key');
			else footnoteMessage = this.$t('views.experiment.instruction.footnote-press-space-bar');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) this.emitStateEndedSignal();
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) this.emitStateEndedSignal();
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
}

.image-area {
	flex-grow: 1;
}
</style>
