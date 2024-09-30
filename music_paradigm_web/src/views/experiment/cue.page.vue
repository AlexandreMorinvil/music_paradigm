<template>
	<div id="cue-state" class="state-content-flex">
		<text-area-component class="text-area state-section" />
		<image-area-component class="image-area state-section" />
		<clicker-area-component class="virtual-controller-area state-section" />
		<piano-area-component class="virtual-controller-area state-section" />
		<keyboard-area-component class="virtual-controller-area state-section" />
		<div v-if="isStayingLongerThanExpected && !hasRestartedTheCueToFixIssue"
			v-on:click="() => handleClickOnReplayButton()" class="fix-issue-replay-button">
			{{ $t('views.experiment.cue.unexpected-issue-needs-replay') }}
		</div>
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
			timeoutUniqueId: null,
			errorAutomaticTransitionMs: 5,
			isSpacebarPressRecorded: false,
			isStayingLongerThanExpected: false,
			hasRestartedTheCueToFixIssue: false,
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
			'stopPlayingMidiFile',
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
		playCue() {
			this.playMidiFile();

			// If the next state is not reached 2 seconds after the expected duration of the audio,
			// we prompt a button to replay the melody
			this.timeoutUniqueId = setTimeout(() => {
				this.isStayingLongerThanExpected = true;
			}, this.midiFileTotalDuration + 2000);
		},
		handleClickOnReplayButton() {
			this.stopPlayingMidiFile();
			setTimeout(() => this.playMidiFile(), 100);
			this.hasRestartedTheCueToFixIssue = true;
		}
	},
	beforeMount() {
		this.updateFootnote();
		if (this.cueEnablePianoAfterCue)
			this.pausePiano();
	},
	mounted() {
		this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
	},
	beforeDestroy() {
		this.stopPlayingMidiFile();
		this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
		clearTimeout(this.timeoutUniqueId);
	},
	watch: {
		isMidiFileLoaded: {
			immediate: true,
			handler: function (isReady) {
				if (!this.cueWaitForClick && isReady) {
					setTimeout(() => { 
						this.playCue();
						setTimeout(this.unPausePiano, this.midiFileTotalDuration - 2000);
					}, this.cuePresentationDelay);
				}
				else if (this.midiName === '')
					setTimeout(() => this.manageHavingNoMidiFile(), this.errorAutomaticTransitionMs);
			},
		},
		isSpaceBarPressed(isPressed) {
			if (this.cueWaitForClick && this.isMidiFileLoaded && isPressed && !this.isSpacebarPressRecorded) {
				this.playCue();
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

.fix-issue-replay-button {
	/* Position */
	margin: 0;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);

	/* Appearance */
	z-index: 10;
	width: 50vw;
	height: 35vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-image: radial-gradient(rgb(200, 165, 0), rgb(200, 130, 30));
	border-radius: 20px;
	text-align: center;

	/* Font-size */
	font-size: 2em;
}
</style>
