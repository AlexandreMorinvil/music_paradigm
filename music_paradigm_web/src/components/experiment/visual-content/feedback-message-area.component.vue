<template>
	<div id="feedback-area" v-if="isDisplayed" class="state-division-text state-section">
		<p v-if="hasGrades && hasSuccessFeedbackMessage && isSuccessful">{{ successFeedbackMessage }}</p>
		<p v-if="hasGrades && hasFailureFeedbackMessage && !isSuccessful">{{ failureFeedbackMessage }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('evaluation', ['hasGrades', 'grades']),
		...mapGetters('experiment', ['hasSuccessFeedbackMessage', 'successFeedbackMessage', 'hasFailureFeedbackMessage', 'failureFeedbackMessage']),
		isSuccessful() {
			if (this.grades.length <= 0) return false;
			for (const grade of this.grades) {
				if (grade.mark < grade.passMark) return false;
			}
			return true;
		},
		canDisplaySuccessFeedbackMessage() {
			return this.hasGrades && this.hasSuccessFeedbackMessage && this.isSuccessful;
		},
		canDisplayFailureFeedbackMessage() {
			return this.hasGrades && this.hasFailureFeedbackMessage && !this.isSuccessful;
		},
		isDisplayed() {
			return this.canDisplaySuccessFeedbackMessage || this.canDisplayFailureFeedbackMessage;
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
</style>
