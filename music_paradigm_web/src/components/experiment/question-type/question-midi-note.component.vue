<template>
	<div id="question-type" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<question-midi-note-options-component v-on:answered="handleAnswer" v-on:questionAsked="handleQuestionAsked" class="options-area state-section" />
		<text-after-question-area-component class="text-after-question-area state-section" ref="postQuestionText" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import QuestionMidiNoteOptionsComponent from '@/components/experiment/visual-content/question-midi-note-options.component.vue';
import TextAfterQuestionAreaComponent from '@/components/experiment/visual-content/text-after-question-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		QuestionMidiNoteOptionsComponent,
		TextAfterQuestionAreaComponent,
		TextAreaComponent,
	},
	data() {
		return {
			DELAY_AFTER_ANSWER: 800,
			context: {},
			answers: null,
		};
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			footnoteMessage = this.$tc('views.experiment.question.midi-note.footnote-explaination');
			this.$emit('footnote', footnoteMessage);
		},
		handleQuestionAsked() {
			this.$refs.postQuestionText.reveal();
		},
		handleAnswer(answerBundle) {
			this.retreiveContext(answerBundle);
			this.retreiveAnswers(answerBundle);
			setTimeout(() => this.$emit('responded', answerBundle), this.DELAY_AFTER_ANSWER);
		},
		retreiveContext(answerBundle) {
			this.context = {
				questionAsked: 'Question related to the audio(s) note(s)',
				questionCorrectAnswerIndex: answerBundle.questionCorrectAnswerIndex,
				questionOptionsValues: answerBundle.questionOptionsValues,
				questionOptionsTexts: answerBundle.questionOptionsTexts,
				questionRelatedContent: answerBundle.questionRelatedContent,
			};
		},
		retreiveAnswers(answerBundle) {
			this.answers = answerBundle.answerIndex;
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 10%;
}

.options-area {
	flex-grow: 1;
	height: 50%;
}

.text-after-question-area {
	flex-grow: 1;
	height: 10%;
}
</style>
