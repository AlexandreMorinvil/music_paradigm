<template>
	<div id="instruction-state" class="state-content-grid">
		<text-area-component />
		<image-area-component />
		<piano-area-component />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';
import { mapGetters } from 'vuex';

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
	data() {
		return {};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['anyPianoKey', 'footnoteMessage']),
		footnote() {
			if (this.footnoteMessage) return this.footnoteMessage;
			if (this.anyPianoKey) return 'Press any piano key or the space bar for going to the next step';
			else return 'Press the space bar for going to the next step';
		},
	},
	methods: {
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	mounted() {
		ExperimentEventBus.$on('advance-request', this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off('advance-request', this.emitStateEndedSignal);
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
