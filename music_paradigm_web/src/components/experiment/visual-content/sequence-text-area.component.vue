<template>
	<div id="text-sequence-area" v-if="shouldExist" class="state-section state-division-text">
		<p v-if="isRevealed" class="horizontal-width">{{ activatedTextContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			activatedTextContent: '',
			isRevealed: false,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'textBeforeMainContent',
			'textAfterQuestionAsked',
			'textAfterAnswerReceived',
			'textWaitBeforeNextStep',
		]),
		textContent() {
			return this.textAfterQuestionAsked;
		},
		shouldExist() {
			return (
				this.hasTextBeforeMainContent ||
				this.hasTextAfterQuestionAsked ||
				this.hasTextAfterAnswerReceived ||
				this.hasTextWaitBeforeNextStep
			);
		},
		hasTextBeforeMainContent() {
			return Boolean(this.textBeforeMainContent);
		},
		hasTextAfterQuestionAsked() {
			return Boolean(this.textAfterQuestionAsked);
		},
		hasTextAfterAnswerReceived() {
			return Boolean(this.textAfterAnswerReceived);
		},
		hasTextWaitBeforeNextStep() {
			return Boolean(this.textWaitBeforeNextStep);
		},
	},
	methods: {
		activateTextBeforeMainContent() {
			this.activatedTextContent = this.textBeforeMainContent;
			this.reveal();
		},
		activateTextAfterQuestionAsked() {
			this.activatedTextContent = this.textAfterQuestionAsked;
			this.reveal();
		},
		activateTextAfterAnswerReceived() {
			this.activatedTextContent = this.textAfterAnswerReceived;
			this.reveal();
		},
		activateTextWaitBeforeNextStep() {
			this.activatedTextContent = this.textWaitBeforeNextStep;
			this.reveal();
		},
		reveal() {
			this.isRevealed = true;
		},
		hide() {
			this.isRevealed = false;
		},
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}

.horizontal-width {
	width: 60%;
}
</style>
