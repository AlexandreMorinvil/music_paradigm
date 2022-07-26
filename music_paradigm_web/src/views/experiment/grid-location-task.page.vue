<template>
	<div id="grid-loaction-task-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<grid-location-task-grid-area-component class="grid-location-task-grid-area state-section" />
		<sequence-text-area-component v-if="hasSequenceText" ref="sequenceText" class="text-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import GridLocationTaskGridAreaComponent from '@/components/experiment/visual-content/grid-location-task-grid-area.component.vue';
import SequenceTextAreaComponent from '@/components/experiment/visual-content/sequence-text-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		GridLocationTaskGridAreaComponent,
		SequenceTextAreaComponent,
		TextAreaComponent,
	},
	data() {
		return {
			TIME_BEFORE_ANYTHING: 3000,
			TIME_AFTER_EVERYTHING: 1500,
			TIME_DISPLAY_PRESENTATION_TEXT: 3000,
			TIME_DISPLAY_START_TEST_TEXT: 3000,
			TIME_DISPLAY_AFTER_TEST_TEXT: 3000,
			TIME_BEFORE_STARTING_PRESENTATION: 3000,
			TIME_BEFORE_STARTING_TEST: 3000,
			TIME_BEFORE_SHOWING_CONCLUSION: 1500,
		};
	},
	computed: {
		...mapGetters('experiment', ['textBeforeMainContent', 'textAfterQuestionAsked', 'textAfterAnswerReceived']),
		hasSequenceText() {
			return this.hasPresentationText || this.hasStartTestText || this.hasAfterTestText;
		},
		hasPresentationText() {
			return Boolean(this.textBeforeMainContent);
		},
		hasStartTestText() {
			return Boolean(this.textAfterQuestionAsked);
		},
		hasAfterTestText() {
			return Boolean(this.textAfterAnswerReceived);
		},
	},
	methods: {
		updateFootnote() {
			const footnoteMessage = this.$t('views.experiment.grid-location-task.footnote');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		async executeSequenceOfSteps() {
			// If there is no sequence text, we wait a certain amount of time before the test.
			if (!this.hasSequenceText) await this.setTimeout(this.TIME_BEFORE_ANYTHING);
			if (this.hasPresentationText) {
				await this.setTimeout(this.TIME_BEFORE_STARTING_PRESENTATION);
				await this.showPresentationText(this.TIME_DISPLAY_PRESENTATION_TEXT);
			}
			if (this.hasStartTestText) {
				await this.setTimeout(this.TIME_BEFORE_STARTING_PRESENTATION);
				await this.showStartTestText(this.TIME_DISPLAY_START_TEST_TEXT);
			}
			if (this.hasAfterTestText) {
				await this.setTimeout(this.TIME_BEFORE_SHOWING_CONCLUSION);
				await this.showAfterTestText(this.TIME_DISPLAY_AFTER_TEST_TEXT);
			}
			await this.setTimeout(this.TIME_AFTER_EVERYTHING);
		},
		async showPresentationText(timeInMilliseconds) {
			this.$refs.sequenceText.activateTextBeforeMainContent();
			await this.setTimeout(timeInMilliseconds);
			this.$refs.sequenceText.hide();
		},
		async showStartTestText(timeInMilliseconds) {
			this.$refs.sequenceText.activateTextAfterQuestionAsked();
			await this.setTimeout(timeInMilliseconds);
			this.$refs.sequenceText.hide();
		},
		async showAfterTestText(timeInMilliseconds) {
			this.$refs.sequenceText.activateTextAfterAnswerReceived();
			await this.setTimeout(timeInMilliseconds);
			this.$refs.sequenceText.hide();
		},
		setTimeout(timeInMilliseconds) {
			return new Promise((resolve) => { setTimeout(resolve, timeInMilliseconds); });
		}
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		this.executeSequenceOfSteps();
	}
};
</script>

<style scoped>
.text-area {
	height: 10%;
}

.grid-location-task-grid-area {
	flex-grow: 1;
}
</style>
