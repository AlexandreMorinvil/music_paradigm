<template>
	<div id="feedback-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<feedback-area-component class="feedback-area state-section" />
		<feedback-message-area-component class="feedback-message-area state-section" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

import FeedbackAreaComponent from '@/components/experiment/visual-content/feedback-area.component.vue';
import FeedbackMessageAreaComponent from '@/components/experiment/visual-content/feedback-message-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		TextAreaComponent,
		FeedbackAreaComponent,
		FeedbackMessageAreaComponent,
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
		...mapGetters('experiment', ['anyPianoKey']),
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = 'Press any piano key or the space bar for going to the next step';
			else footnoteMessage = 'Press the space bar for going to the next step';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) {
				this.emitStateEndedSignal();
			}
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) {
				this.emitStateEndedSignal();
			}
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 20%;
}

.feedback-area {
	flex-grow: 2;
	height: 60%;
}

.feedback-message-area {
	flex-grow: 1;
	height: 20%;
}
</style>
