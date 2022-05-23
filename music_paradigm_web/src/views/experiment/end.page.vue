<template>
	<div id="end-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<clicker-area-component class="virtual-controller-area state-section" />
		<piano-area-component class="virtual-controller-area state-section" />
		<keyboard-area-component class="virtual-controller-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

import ClickerAreaComponent from '@/components/experiment/visual-content/clicker-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		TextAreaComponent,
		ClickerAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,
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
		...mapGetters('piano', ['pressedKeys']),
		...mapGetters('experiment', ['anyPianoKey']),
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = this.$t('views.experiment.end.footnote-press-any-key');
			else footnoteMessage = this.$t('views.experiment.end.footnote-press-space-bar');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		endTask() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
		ExperimentEventBus.$emit(experimentEvents.EVENT_EXPERIMENT_REACHED_CONCLUSION);
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.endTask);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.endTask);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) {
				this.endTask();
			}
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) {
				this.endTask();
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

.virtual-controller-area {
	flex-grow: 1;
}
</style>
