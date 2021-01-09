<template>
	<div id="end-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<piano-area-component class="piano-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

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
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = 'Press any piano key or the space bar for ending the experiment';
			else footnoteMessage = 'Press the space bar for ending the experiment';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) {
				ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_ENDED);
			}
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) {
				ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_ENDED);
			}
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

.piano-area {
	flex-grow: 1;
}
</style>