<template>
	<div id="instruction-state" class="state-content-flex">
		<image-area-component class="image-area state-section" />
		<text-area-component class="text-area state-section" />
		<survey-area-component class="survey-area state-section" ref="survey" />
		<button-area-component class="button-area state-section" :text="buttonText" ref="button" v-on:clicked="emitStateEndedSignal" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import ButtonAreaComponent from '@/components/experiment/visual-content/button-area.component.vue';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import SurveyAreaComponent from '@/components/experiment/visual-content/survey-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ButtonAreaComponent,
		ImageAreaComponent,
		SurveyAreaComponent,
		TextAreaComponent,
	},
	props: {},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['surveyAreAnswersMandatory']),
		buttonText() {
			return this.$t('views.experiment.survey.continue');
		},
	},
	methods: {
		...mapActions('survey', ['setSurveyContext', 'setSurveyAnswers']),
		updateFootnote() {
			let footnoteMessage = '';
			if (this.surveyAreAnswersMandatory) footnoteMessage = this.$t('views.experiment.survey.footnote-answer-first');
			else footnoteMessage = this.$t('views.experiment.survey.footnote-can-move-on');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		storeSurveyRecords() {
			this.setSurveyContext(this.$refs.survey.context);
			this.setSurveyAnswers(this.$refs.survey.answers);
		},
		emitStateEndedSignal() {
			this.storeSurveyRecords();
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		activateButtonIfAppropriate() {
			if (this.surveyAreAnswersMandatory && !this.$refs.survey.allAnswersAreGiven) this.$refs.button.deactivate();
			else this.$refs.button.activate();
		},
	},
	beforeMount() {
		this.updateFootnote();
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	mounted() {
		this.$refs.button.setText(this.buttonText);
		this.$watch(() => this.$refs.survey.allAnswersAreGiven, this.activateButtonIfAppropriate, { immediate: true });
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
}

.image-area {
	flex-grow: 1;
}

.survey-area {
	flex-grow: 1;
}

.button-area {
	flex-grow: 1;
}
</style>
