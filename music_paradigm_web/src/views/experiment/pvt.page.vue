<template>
	<div id="instruction-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<pvt-stimulus-area-component class="image-area state-section" v-on:pvtMoveOn="handleMoveOn" ref="stimulus" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';

import PvtStimulusAreaComponent from '@/components/experiment/visual-content/pvt-stimulus-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

export default {
	components: {
		TextAreaComponent,
		PvtStimulusAreaComponent,
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
		return {
			//
			pvtStimuli: [],
			pvtInputTimes: [],
			pvtReactionTimes: [],
			pvtAreTooEarly: [],

			// Delays
			DELAY_AFTER_INPUT_RECEIVED: 3000,
		};
	},
	computed: {
		...mapGetters('experiment', ['pvtMinTime', 'pvtMaxTime', 'pvtCount']),
		numberSuccessfulStimuli() {
			return this.pvtReactionTimes.length;
		},
		hasDoneAllRequiredStimuli() {
			return this.numberSuccessfulStimuli >= this.pvtCount;
		},
	},
	methods: {
		updateFootnote() {
			let footnoteMessage = '';
			if (this.anyPianoKey) footnoteMessage = this.$t('views.experiment.pvt.footnote-press-any-key');
			else footnoteMessage = this.$t('views.experiment.pvt.footnote-press-space-bar');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handleUserInput() {
			this.$refs.stimulus.handleUserInput();
		},
		parseResult(pvtResult) {
			const { stimulusTime, inputTime, isTooEarly, reactionTime } = pvtResult;
			this.pvtStimuli.push(stimulusTime);
			this.pvtInputTimes.push(inputTime);
			this.pvtAreTooEarly.push(isTooEarly);
			if (!isTooEarly) this.pvtReactionTimes.push(reactionTime);
		},
		handleMoveOn(pvtResult) {
			this.parseResult(pvtResult);
			setTimeout(() => {
				if (this.hasDoneAllRequiredStimuli) {
					// TODO: HANDLE LOGS
					this.emitStateEndedSignal();
				} else this.$refs.stimulus.restart();
			}, this.DELAY_AFTER_INPUT_RECEIVED);
		},
		emitStateEndedSignal() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
		window.addEventListener('pointerdown', this.handleUserInput);
		ExperimentEventBus.$on(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	beforeDestroy() {
		window.removeEventListener('pointerdown', this.handleUserInput);
		ExperimentEventBus.$off(experimentEvents.EVENT_ADVANCE_REQUEST, this.emitStateEndedSignal);
	},
	watch: {
		isSpaceBarPressed(isPressed) {
			if (isPressed) this.handleUserInput();
		},
		pressedKeys(keys) {
			if (this.anyPianoKey && keys.length > 0) this.handleUserInput();
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 10%;
}

.pvt-stimulus-area {
	flex-grow: 1;
}
</style>
