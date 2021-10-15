<template>
	<div id="instruction-state" class="state-content-flex">
		<image-area-component class="image-area state-section" />
		<text-area-component class="text-area state-section" />
		<writting-area-component class="writting-area state-section" ref="writting" />
		<button-area-component class="button-area state-section" :text="buttonText" ref="button" v-on:clicked="emitStateEndedSignal" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import ButtonAreaComponent from '@/components/experiment/visual-content/button-area.component.vue';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';
import WrittingAreaComponent from '@/components/experiment/visual-content/writting-area.component.vue';

export default {
	components: {
		ButtonAreaComponent,
		ImageAreaComponent,
		TextAreaComponent,
		WrittingAreaComponent,
	},
	props: {},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['writtingMinCharacters']),
		buttonText() {
			return this.$t('views.experiment.writting.continue');
		},
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.surveyAreAnswersMandatory) footnoteMessage = this.$t('views.experiment.writting.footnote-answer-first');
			else footnoteMessage = this.$t('views.experiment.writting.footnote-can-move-on');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
		activateButtonIfAppropriate() {
			if (this.$refs.writting.textLength < this.writtingMinCharacters) this.$refs.button.deactivate();
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
		this.$watch(() => this.$refs.writting.textLength, this.activateButtonIfAppropriate, { immediate: true });
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

.writting-area {
	flex-grow: 1;
}

.button-area {
	flex-grow: 1;
}
</style>
