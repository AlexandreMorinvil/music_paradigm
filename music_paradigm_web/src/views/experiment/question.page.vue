<template>
	<div  class="state-content-flex">
		<component
			:is="type"
			class="question-area state-section"
			v-on:responded="handdleResponded"
			v-on:footnote="updateFootnote"
			ref="question"
		/>
		<button-area-component
			v-if="hasSubmissionButtons"
			class="button-area state-section"
			ref="buttons"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { mapActions, mapGetters } from 'vuex';

import AudioQuestionComponent from '@/components/experiment/question-type/question-audio-first.component';
import ImageQuestionComponent from '@/components/experiment/question-type/question-image-choices.component';
import MidiNoteQuestionComponent from '@/components/experiment/question-type/question-midi-note.component';
import SimpleQuestionComponent from '@/components/experiment/question-type/question-simple.component';

import ButtonAreaComponent from '@/components/experiment/visual-content/button-area.component.vue';

export default {
	components: {
		ButtonAreaComponent,
		simple: SimpleQuestionComponent,
		'audio-start': AudioQuestionComponent,
		'image-choices': ImageQuestionComponent,
		'midi-note': MidiNoteQuestionComponent,
	},
	data() {
		return {
			allowedTypes: ['simple', 'image-choices', 'audio-start', 'midi-note'],
			hasReceivedStartSignal: false,
			DEFAULT_QUESTION_TYPE: 'simple',
		};
	},
	computed: {
		...mapGetters('experiment', [
			'questionType',
			'questionMustConfirmAnswer',
			'questionCanSubmitBlankAnswer',
			'questionSubmitAnswerButtonText',
			'questionBlankAnswerButtonText',
		]),
		hasSubmissionButtons() {
			return this.questionMustConfirmAnswer || this.questionCanSubmitBlankAnswer;
		},
		submitButtonText() {
			if (this.questionSubmitAnswerButtonText) return this.questionSubmitAnswerButtonText;
			else return this.$t('views.experiment.question.submit');
		},
		submitNoAnswerButtonText() {
			if (this.questionBlankAnswerButtonText) return this.questionBlankAnswerButtonText;
			else return this.$t('views.experiment.question.submit-no-answer');
		},
		type() {
			if (this.allowedTypes.includes(this.questionType)) return this.questionType;
			else return this.DEFAULT_QUESTION_TYPE;
		},
	},
	methods: {
		...mapActions('question', ['setQuestionContext', 'setQuestionAnswers', 'resetQuestion']),
		updateFootnote(footnoteMessage) {
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		storeQuestionRecords() {
			this.setQuestionContext(this.$refs.question.context);
			this.setQuestionAnswers(this.$refs.question.answers);
		},
		handdleResponded() {
			this.storeQuestionRecords();
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		activateAppropriateButtons() {
			if (!this.hasSubmissionButtons) return;
			this.$refs.buttons.setTextPrimaryButton(this.submitButtonText);
			this.$refs.buttons.setTextSecondaryButton(this.submitNoAnswerButtonText);

			// Manage the submit button.
			if (this.questionMustConfirmAnswer) {
				this.$refs.buttons.showPrimaryButton();
				this.$refs.buttons.deactivatePrimaryButton();
			} else this.$refs.buttons.hidePrimaryButton();

			// Manage the button for submitting no answer.
			if (this.questionCanSubmitBlankAnswer) {
				this.$refs.buttons.showSecondaryButton();
				this.$refs.buttons.activateSecondaryButton();
			} else this.$refs.buttons.hideSecondaryButton();
		},
		startAsking() {
			this.hasReceivedStartSignal = true;
			this.$refs.question.start();
		},
	},
	beforeMount() {
		this.resetQuestion();
		this.updateFootnote();
	},
	mounted() {
		this.activateAppropriateButtons();
		ExperimentEventBus.$on(experimentEvents.EVENT_START_SIGNAL_READY, this.startAsking);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_START_SIGNAL_READY, this.startAsking);
	},
};
</script>

<style scoped>
.question-area {
	flex-grow: 1;
}
.button-area {
	height: auto;
	flex-grow: 0;
}
</style>
