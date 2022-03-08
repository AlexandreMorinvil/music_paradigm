<template>
	<div id="instruction-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<pvt-stimulus-area-component class="image-area state-section" ref="stimulus" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import PvtStimulusAreaComponent from '@/components/experiment/visual-content/pvt-stimulus-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		TextAreaComponent,
		PvtStimulusAreaComponent,
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
		isMousePressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {
			hasReceivedInput: false,
			stimuliArray: [],
			reactionTimaeArray: [],
			isSuccessArray: [],
		};
	},
	computed: {
		...mapGetters('experiment', ['pvtMinTime', 'pvtMaxTime', 'pvtCount']),
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = this.$t('views.experiment.pvt.footnote-press-any-key');
			else footnoteMessage = this.$t('views.experiment.pvt.footnote-press-space-bar');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handleUserInput() {
			this.$refs.stimulus.handleUserInput();
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
			if (isPressed) this.handleUserInput();
		},
		isMousePressed(isPressed) {
			if (isPressed) this.handleUserInput();
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) this.handleUserInput();
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 10%;
}

.pvt-stimulus-area {
	flex-grow: 1;
}
</style>
