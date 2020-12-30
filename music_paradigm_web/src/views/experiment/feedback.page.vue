<template>
	<div id="feedback-state" class="experiment-state-container" :class="gridClass">
		<text-area-component />
		<div id="visual-media-area" class="experiment-state-division state-division-visual-media">
			<div class="feedback-grade-board">
				<p v-if="!hasGrades">No performance was graded</p>
				<div v-else class="feedback-box" v-for="grade in grades" :key="grade.criteria">
					<feedback-grade-component :grade="grade" />
				</div>
			</div>
			<div v-if="hasSuccessFeedbackMessage && isSuccessful" class="success-feedback-message feedback-message">
				{{ successFeedbackMessage }}
			</div>
			<div v-if="hasFailureFeedbackMessage && !isSuccessful" class="success-feedback-message feedback-message">
				{{ failureFeedbackMessage }}
			</div>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import '@/styles/experiment-content-template.css';
import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';

import FeedbackGradeComponent from '@/components/experiment/feedback/feedback-grade.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		TextAreaComponent,
		FeedbackGradeComponent,
	},
	props: {
		lastPressedKey: {
			type: String,
			default() {
				return '';
			},
		},
		isSpaceBarPressed: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('piano', ['grades', 'pressedKeys']),
		...mapGetters('experiment', ['hasText', 'anyPianoKey', 'successFeedbackMessage', 'failureFeedbackMessage']),
		gridClass() {
			if (this.hasText) return 'grid-small-area-big-area';
			else return 'grid-single-area';
		},
		hasGrades() {
			if (Array.isArray(this.grades) && this.grades.length > 0) return true;
			else return false;
		},
		isSuccessful() {
			if (this.grades.length <= 0) return false;
			for (const grade of this.grades) {
				if (grade.mark < grade.passMark) return false;
			}
			return true;
		},
		hasSuccessFeedbackMessage() {
			return Boolean(this.successFeedbackMessage);
		},
		hasFailureFeedbackMessage() {
			return Boolean(this.failureFeedbackMessage);
		},
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = 'Press any piano key or the space bar for going to the next step';
			else footnoteMessage = 'Press the space bar for going to the next step';
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
	},
	mounted() {
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) {
				this.emitStateEndedSignal();
			}
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) {
				this.emitStateEndedSignal();
			}
		},
	},
};
</script>

<style scoped>
#visual-media-area {
	display: grid;
	grid-template-rows: 1fr auto;
	grid-template-columns: 1fr;
}

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

.success-feedback-message {
	text-align: center;
	font-size: calc(1vh + 1vw);
}

.feedback-message {
	margin-bottom: 100px;
}
</style>
