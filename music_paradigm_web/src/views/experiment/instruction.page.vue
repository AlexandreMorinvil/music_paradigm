<template>
	<div id="instruction-state" class="state-content-grid">
		<text-area-component />
		<image-area-component />
		<piano-area-component />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		PianoAreaComponent,
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
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['anyPianoKey']),
	},
	methods: {
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = 'Press any piano key or the space bar for going to the next step';
			else footnoteMessage = 'Press the space bar for going to the next step';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
	},
	beforeMount() {
		this.updateFootnote();
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
.state-content-grid {
	display: grid;
	justify-content: center;
	align-content: space-between;
	grid-template-columns: 100%;
	grid-auto-rows: minmax(0, 1fr);
	grid-row-gap: 2.5%;
}
</style>
