<template>
	<div id="preparing-state">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<piano-area-component class="piano-area state-section" />
		<keyboard-area-component class="piano-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
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
	components: {
		ImageAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,
		TextAreaComponent,
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['anyPianoKey']),
	},
	methods: {
		...mapActions('experiment', ['goPreludeNextStep']),
		displayPreludeFirstStep() {
			this.initializeSession();
			this.updateState();
		},
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = this.$t('views.experiment.instruction.footnote-press-any-key');
			else footnoteMessage = this.$t('views.experiment.instruction.footnote-press-space-bar');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitPreludeEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_PRELUDE_OVER);
		},
	},
	beforeMount() {
		this.updateFootnote();
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitPreludeEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitPreludeEndedSignal);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) this.emitPreludeEndedSignal();
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) this.emitPreludeEndedSignal();
		},
	},
};
</script>

<style scoped></style>
