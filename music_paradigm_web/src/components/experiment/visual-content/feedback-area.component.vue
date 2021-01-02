<template>
	<div id="feedback-area" class="feedback-grade-board state-section">
		<p v-if="!hasGrades">No performance was graded</p>
		<div v-else class="feedback-box" v-for="grade in grades" :key="grade.criteria">
			<feedback-grade-component :grade="grade" />
		</div>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import FeedbackGradeComponent from '@/components/experiment/feedback/feedback-grade.component.vue';

export default {
	components: {
		FeedbackGradeComponent,
	},
	computed: {
		...mapGetters('piano', ['hasGrades', 'grades']),
	},
};
</script>

<style scoped>
.feedback-grade-board {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	height: 70%;
	width: 100%;
}

.feedback-box {
	display: flex;
	justify-content: center;
	align-items: center;
	margin: 0 2% 0;
	width: auto;
	height: 100%;
}
</style>
