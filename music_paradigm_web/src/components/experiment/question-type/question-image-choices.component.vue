<template>
	<div id="question-type" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<div class="images-area image-disposition">
			<image-area-component class="question-image-area" />
			<question-image-choices-options-component v-on:answered="handleAnswer" v-on:questionAsked="handleQuestionAsked" class="options-image-area" />
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
		};
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			footnoteMessage = this.$tc('views.experiment.question.audio.footnote-explaination');
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

.images-area {
	flex-grow: 1;
	height: 70%;
}

.image-disposition {
	display: flex;
	flex-direction: row;
	align-content: center;
	justify-content: center;
	align-items: center;
}

.questions-image-area {
	/* flex-grow: 1; */
	width: 30%;
}

.options-image-area {
	flex-grow: 1;
	width: 70%;
}

.text-after-question-area {
	flex-grow: 1;
	height: 10%;
}
</style>
