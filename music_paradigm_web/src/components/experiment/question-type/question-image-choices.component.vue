<template>
	<div id="question-type" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<div class="images-area image-disposition">
			<image-area-component class="question-image-half" />
			<question-image-choices-options-component v-on:answered="handleAnswer" v-on:questionAsked="handleQuestionAsked" class="options-image-half" />
		</div>
		<text-after-question-area-component class="text-after-question-area state-section" ref="postQuestionText" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import QuestionImageChoicesOptionsComponent from '@/components/experiment/visual-content/question-image-choices-options.component.vue';
import TextAfterQuestionAreaComponent from '@/components/experiment/visual-content/text-after-question-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		QuestionImageChoicesOptionsComponent,
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
			footnoteMessage = this.$tc('views.experiment.question.image-choices.footnote-explaination');
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
				questionAsked: 'Question in main image file',
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
.image-disposition {
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
}

.text-area {
	height: 10%;
}

.images-area {
	height: 70%;
}

.text-after-question-area {
	height: 10%;
}

.question-image-half {
	width: 50%;
}

.options-image-half {
	width: 50%;
	height: 100%;
}
</style>
