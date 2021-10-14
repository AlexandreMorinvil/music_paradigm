<template>
	<div id="instruction-state" class="state-content-flex">
		<image-area-component class="image-area state-section" />
		<text-area-component class="text-area state-section" />
		<survey-area-component class="text-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import SurveyAreaComponent from '@/components/experiment/visual-content/survey-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		SurveyAreaComponent,
		TextAreaComponent,
	},
	props: {},
	computed: {
		...mapGetters(['urlExperimentRessource']),
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			footnoteMessage = this.$t('views.experiment.survey.footnote-answer-first');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	watch: {},
};
</script>

<style scoped>
.text-area {
	flex-grow: 0;
}

.image-area {
	flex-grow: 2;
}

.survey-area {
	flex-grow: 1;
}
</style>
