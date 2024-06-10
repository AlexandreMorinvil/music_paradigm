<template>
	<div id="cue-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<clicker-area-component class="virtual-controller-area state-section" />
		<piano-area-component class="virtual-controller-area state-section" />
		<keyboard-area-component class="virtual-controller-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import ImageAreaComponent from '@/components/experiment/visual-content/image-area.component.vue';
import TextAreaComponent from '@/components/experiment/visual-content/text-area.component.vue';

import ClickerAreaComponent from '@/components/experiment/visual-content/clicker-area.component.vue';
import KeyboardAreaComponent from '@/components/experiment/visual-content/keyboard-area.component.vue';
import PianoAreaComponent from '@/components/experiment/visual-content/piano-area.component.vue';

export default {
	components: {
		ImageAreaComponent,
		TextAreaComponent,
		ClickerAreaComponent,
		KeyboardAreaComponent,
		PianoAreaComponent,
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
			errorAutomaticTransitionMs: 5,
			isSpacebarPressRecorded: false,
		};
	},
	computed: {
		...mapGetters('piano', ['isMidiFileLoaded', 'midiFileTotalDuration']),
		...mapGetters('experiment', [
			'cuePresentationDelay', 
			'midiName', 
			'cueWaitForClick',
			'cueMelodyProportionalDelayAfter',
			'cueAdditionalDelayAfter',
			'cueEnablePianoAfterCue',
		]),
	},
	methods: {
		...mapActions('piano', [
			'playMidiFile', 
			'addPlayerEndOfFileAction', 
			'removePlayerEndOfFileAction',
			'pausePiano',
			'unPausePiano',
		]),
		updateFootnote() {
			let footnoteMessage = '';
			const secondsLeft = this.errorAutomaticTransitionSeconds;
			if (!this.midiName)
				footnoteMessage = this.$tc('views.experiment.cue.footnote-no-melody', secondsLeft, { second: secondsLeft });
			else if (!this.cueWaitForClick) footnoteMessage = this.$t('views.experiment.cue.footnote-after-melody');
			else footnoteMessage = this.$t('views.experiment.cue.footnote-after-wait-click');
			ExperimentEventBus.$emit(experimentEvents.EVENT_SET_FOOTNOTE, footnoteMessage);
		},
		handleEndOfMidiFile() {
			const delayAfterMelody = 0 + 
				this.cueMelodyProportionalDelayAfter * this.midiFileTotalDuration +
				this.cueAdditionalDelayAfter;
			setTimeout(() => {
				ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
			}, delayAfterMelody)
		},
		manageHavingNoMidiFile() {
			ExperimentEventBus.$emit(experimentEvents.EVENT_STATE_ENDED);
		},
	},
	beforeMount() {
		this.updateFootnote();
		if (this.cueEnablePianoAfterCue)
			this.pausePiano()
	},
	mounted() {
		this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
	},
	beforeDestroy() {
		this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
	},
	watch: {
		isMidiFileLoaded: {
			immediate: true,
			handler: function (isReady) {
				if (!this.cueWaitForClick && isReady) {
					setTimeout(() => { 
						this.playMidiFile();
						setTimeout(this.unPausePiano, this.midiFileTotalDuration - 2000);
					}, this.cuePresentationDelay);
				}
				else if (this.midiName === '')
					setTimeout(() => this.manageHavingNoMidiFile(), this.errorAutomaticTransitionMs);
			},
		},
		isSpaceBarPressed(isPressed) {
			if (this.cueWaitForClick && this.isMidiFileLoaded && isPressed && !this.isSpacebarPressRecorded) {
				this.playMidiFile();
				this.isSpacebarPressRecorded = true;
			}
		},
	},
};
</script>

<style scoped>
.text-area {
	flex-grow: 1;
	height: 30%;
}

.image-area {
	flex-grow: 1;
	height: 50%;
}

.virtual-controller-area {
	flex-grow: 1;
	height: 50%;
}
</style>
