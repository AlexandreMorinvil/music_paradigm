<template>
	<div id="instruction-state" class="experiment-state-grid" :class="gridClass">
		<div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>

		<visual-media-image-component />
		<!-- <div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<visual-piano v-if="hasInteractivePiano" />
			<img id="instruction-img" v-else :src="urlExperimentRessource(pictureName)" alt="Instruction" />
		</div> -->
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import VisualMediaImageComponent from '@/components/experiment/visual-content/visual-media-image.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		VisualMediaImageComponent,
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
		...mapGetters('experiment', [
			'hasNoContent',
			'hasInteractivePiano',
			'hasText',
			'hasVisualMedia',
			'pictureName',
			'textContent',
			'anyPianoKey',
			'footnoteMessage',
		]),
		gridClass() {
			if (this.hasVisualMedia) return 'grid-half-half';
			else return 'grid-fill';
		},
		footnote() {
			if (this.footnoteMessage) return this.footnoteMessage;
			if (this.anyPianoKey) return 'Press any piano key or the space bar for going to the next step';
			else return 'Press the space bar for going to the next step';
		},
		textToDisplay() {
			let footnoteMessage = '';
			if (this.hasNoContent) footnoteMessage = 'Instruction';
			else footnoteMessage = this.textContent;
			this.$emit('footnote', footnoteMessage);
			return footnoteMessage;
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

<style scoped></style>
