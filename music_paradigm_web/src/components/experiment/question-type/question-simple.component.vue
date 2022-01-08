<template>
	<div id="question-type" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<question-simple-options-component v-on:answered="handleAnswer" v-on:questionAsked="handleQuestionAsked" class="options-area state-section" />
		<text-after-question-area-component class="text-after-question-area state-section" ref="postQuestionText"/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import QuestionSimpleOptionsComponent from '@/components/experiment/visual-content/question-simple-options.component.vue';
import TextAfterQuestionAreaComponent from '@/components/experiment/visual-content/text-after-question-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		QuestionSimpleOptionsComponent,
		TextAfterQuestionAreaComponent,
		TextAreaComponent,
	},
	data() {
		return {
			DELAY_AFTER_ANSWER: 800,
		};
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			footnoteMessage = this.$tc('views.experiment.question.simple.footnote-explaination');
			this.$emit('footnote', footnoteMessage);
		},
		handleQuestionAsked() {
			this.$refs.postQuestionText.reveal();
		},
		handleAnswer(answerBundle) {
			console.log(answerBundle);
			setTimeout(() => this.$emit('responded', answerBundle), this.DELAY_AFTER_ANSWER);
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
