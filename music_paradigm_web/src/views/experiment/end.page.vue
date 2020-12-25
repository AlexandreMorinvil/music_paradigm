<template>
	<div id="end-state" class="experiment-state-container" :class="gridClass">
		<div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
			{{ textToDisplay }}
		</div>

		<div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<img id="end-img" :src="urlExperimentRessource(pictureName)" alt="Instruction" />
		</div>

		<div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">
			{{ footnote }}
		</div>
	</div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { ExperimentEventBus, events } from '@/_services/eventBus.service.js';
import { mapGetters } from 'vuex';

export default {
	components: {},
	props: {
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
			'hasText',
			'hasVisualMedia',
			'hasFootnote',
			'pictureName',
			'textContent',
			'anyPianoKey',
			'footnoteMessage',
		]),
		gridClass() {
			if (this.hasFootnote) {
				if (this.hasText && this.hasVisualMedia) return 'grid-area-area-note';
				else return 'grid-area-note';
			} else if (this.hasText && this.hasVisualMedia) return 'grid-area-area';
			else return 'grid-single-area';
		},
		textToDisplay() {
			if (this.textContent === '') return 'End';
			else return this.textContent;
		},
		footnote() {
			if (this.footnoteMessage) return this.footnoteMessage;
			if (this.anyPianoKey) return 'Press any piano key or the space bar for ending the experiment';
			else return 'Press the space bar for ending the experiment';
		},
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) {
				ExperimentEventBus.$emit(events.EVENT_EXPERIMENT_ENDED);
			}
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) {
				ExperimentEventBus.$emit(events.EVENT_EXPERIMENT_ENDED);
			}
		},
	},
};
</script>

<style scoped></style>
