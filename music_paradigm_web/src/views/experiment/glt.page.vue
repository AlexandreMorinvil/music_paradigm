<template>
	<div id="grid-loaction-task-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<glt-grid-area-component class="glt-grid-area state-section" ref="gridLocationTask" />
		<sequence-text-area-component v-if="hasSequenceText" class="text-area state-section" ref="sequenceText" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import GltGridAreaComponent from '@/components/experiment/visual-content/glt-grid-area.component.vue';
import SequenceTextAreaComponent from '@/components/experiment/visual-content/sequence-text-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		GltGridAreaComponent,
		SequenceTextAreaComponent,
		TextAreaComponent,
	},
	data() {
		return {
			TIME_BEFORE_ANYTHING: 3000,
			TIME_AFTER_EVERYTHING: 1500,
			TIME_SMALL_TRANSITION_TIME: 1000,
			TIME_DISPLAY_PRESENTATION_TEXT: 3000,
			TIME_DISPLAY_START_TEST_TEXT: 3000,
			TIME_DISPLAY_AFTER_TEST_TEXT: 3000,
			TIME_BEFORE_STARTING_PRESENTATION: 3000,
			TIME_BEFORE_STARTING_TEST: 3000,
			TIME_BEFORE_SHOWING_CONCLUSION: 1000,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'includesPresentation',
			'includesTest',
			'textBeforeMainContent',
			'reproductionSeed',
			'textAfterQuestionAsked',
			'textAfterAnswerReceived',
			'textWaitBeforeNextStep',
			'waitBeforeNextStep',
		]),
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
		hasBeforeNextStepText() {
			return Boolean(this.textWaitBeforeNextStep);
		},
		blockParameters() {
			return {
				reproductionSeed: this.reproductionSeed,
				includesPresentation: this.includesPresentation,
				includesTest: this.includesTest,
			};
		},
	},
	methods: {
		...mapActions('glt', [
			'evaluateGlt',
			'recordMatrixSetup',
			'recordGltResults',
			'recordGltParameters',
			'resetGltRecords',
		]),
		updateFootnote() {
			const footnoteMessage = this.$t('views.experiment.glt.footnote');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		storeGltRecords() {
			this.recordGltParameters(this.blockParameters);
			this.recordMatrixSetup(this.$refs.gridLocationTask.matrixSetup);
			this.recordGltResults(this.$refs.gridLocationTask.results);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		async executeSequenceOfSteps() {
			// If there is no sequence text, we wait a certain amount of time before the test.
			if (!this.hasSequenceText) await this.setTimeout(this.TIME_BEFORE_ANYTHING);

			// Present the images.
			if (this.hasPresentationText) {
				await this.setTimeout(this.TIME_BEFORE_STARTING_PRESENTATION);
				await this.showPresentationText(this.TIME_DISPLAY_PRESENTATION_TEXT);
				await this.setTimeout(this.TIME_SMALL_TRANSITION_TIME);
			}
			if (this.includesPresentation) await this.presentImages();

			// Submit the test.
			if (this.hasStartTestText) {
				await this.setTimeout(this.TIME_BEFORE_STARTING_PRESENTATION);
				await this.showStartTestText(this.TIME_DISPLAY_START_TEST_TEXT);
				await this.setTimeout(this.TIME_SMALL_TRANSITION_TIME);
			}
			if (this.includesTest) await this.testImages();

			// Record the results.
			this.storeGltRecords();
			this.evaluateGlt();

			// Conclude the test block.
			if (this.hasAfterTestText) {
				await this.setTimeout(this.TIME_BEFORE_SHOWING_CONCLUSION);
				await this.showAfterTestText(this.TIME_DISPLAY_AFTER_TEST_TEXT);
			}
			await this.setTimeout(this.TIME_AFTER_EVERYTHING);
		},
		async waitBeforeEnding() {
			// Wait a small delay before continuing.
			await this.showTextWaitBeforeNextStep(this.waitBeforeNextStep);
		},
		async presentImages() {
			await this.$refs.gridLocationTask.presentMatrix();
		},
		async testImages() {
			await this.$refs.gridLocationTask.askImagePositions();
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
		async showTextWaitBeforeNextStep(timeInMilliseconds) {
			this.$refs.sequenceText.activateTextWaitBeforeNextStep();
			await this.setTimeout(timeInMilliseconds);
			this.$refs.sequenceText.hide();
		},
		setTimeout(timeInMilliseconds) {
			return new Promise((resolve) => {
				setTimeout(resolve, timeInMilliseconds);
			});
		},
	},
	beforeMount() {
		this.resetGltRecords();
		this.updateFootnote();
	},
	async mounted() {
		await this.executeSequenceOfSteps();
		await this.waitBeforeEnding();
		this.emitStateEndedSignal();
	},
};
</script>

<style scoped>
.text-area {
	height: 10%;
}

.glt-grid-area {
	flex-grow: 1;
}
</style>
