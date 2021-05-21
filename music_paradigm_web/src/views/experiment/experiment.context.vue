<template>
	<div id="experiment" class="experiment-grid unselectable">
		<log-component style="display: none" ref="log" />
		<status-bar-component class="status-bar-position" ref="status" />

		<div id="state-content" class="state-content-position">
			<experiment-content :lastPressedKey="lastPressedKey" :isSpaceBarPressed="isSpaceBarPressed" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/event-bus/experiment-event-bus.service.js';
import { KeyboardEventBus, keyboardEvents } from '@/_services/event-bus/keyboard-event-bus.service.js';
import { PianoEventBus, pianoEvents } from '@/_services/event-bus/piano-event-bus.service.js';
import ExperimentContent from '@/components/content-frame/experiment-content-frame.component.vue';
import LogComponent from '@/components/experiment/log/log.component.vue';
import StatusBarComponent from '@/components/experiment/status-bar/status-bar.component.vue';

export default {
	components: {
		ExperimentContent,
		LogComponent,
		StatusBarComponent,
	},
	data() {
		return {
			isSpaceBarPressed: false,
			needsConfirmationToLeave: true,
			lastPressedKey: '',
		};
	},
	computed: {
		...mapGetters('experiment', [
			'hasPrelude',
			'midiName',
			'referenceKeyboardKeys',
			'controlType',
			'checkpoint',
			'isFirstIndexPassage',
			'needsResetLoopParameters',
			'isNewBlock',
		]),
	},
	methods: {
		...mapActions('session', ['concludeSession', 'initializeSession', 'saveSessionState', 'forgetSessionState']),
		...mapActions('experiment', [
			'initializePrelude',
			'updateState',
			'goNextStep',
			'goPreviousInnerStep',
			'goStepPostSkip',
			'clearState',
			'endExperimentByTimeout',
			'concludeExperiment',
		]),
		...mapActions('keyboard', ['loadReferenceKeyboardKeys', 'resetPressedKeyboardKeysLogs', 'resetKeyboardTracking']),
		...mapActions('piano', ['loadMidiFile', 'resetPlayedNotesLogs', 'resetPianoState']),
		initializeControl() {
			if (this.controlType === 'piano') PianoEventBus.$emit(pianoEvents.EVENT_PIANO_INIT_REQUEST);
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_INIT_REQUEST);
		},
		terminateControl() {
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST);
		},
		handleTimesUp() {
			this.endExperimentByTimeout();
		},
		handleSaveSessionState() {
			if (!this.checkpoint) return;
			else if (this.checkpoint === 'once' && this.isFirstIndexPassage) this.saveSessionState();
			else if (this.checkpoint === 'first' && this.needsResetLoopParameters) this.saveSessionState();
			else if (this.checkpoint === 'all' && this.isNewBlock) this.saveSessionState();
		},
		startExperiement() {
			if (this.hasPrelude) this.initializePrelude();
			else this.displayFirstStep();
		},
		displayFirstStep() {
			this.initializeSession();
			this.updateState();
			this.$refs.log.initialize();
			this.$refs.status.start();
		},
		navigateExperiment() {
			this.resetPresses();
			this.goNextStep();
			this.handleSaveSessionState();
		},
		navigateBackAnInnerStep() {
			this.resetPresses();
			this.goPreviousInnerStep();
		},
		navigateExperimentSkip() {
			this.resetPresses();
			this.goStepPostSkip();
			this.handleSaveSessionState();
		},
		endExperiment() {
			this.$refs.log.conclude();
			this.needsConfirmationToLeave = false;
			this.forgetSessionState();
			this.concludeSession();
			this.concludeExperiment();
		},
		resetPresses() {
			this.$refs.log.addBlock();
			this.resetPressedKeyboardKeysLogs();
			this.resetPlayedNotesLogs();
		},
		handleButtonPress(pressedKey) {
			if (pressedKey.key === ' ') this.isSpaceBarPressed = true;
			this.lastPressedKey = '';
			this.lastPressedKey = pressedKey.key.toLowerCase();
		},
		handleButtonRelease(releasedKey) {
			if (releasedKey.key === ' ') this.isSpaceBarPressed = false;
		},
	},
	mounted() {
		window.addEventListener('keydown', this.handleButtonPress);
		window.addEventListener('keyup', this.handleButtonRelease);
		ExperimentEventBus.$on(experimentEvents.EVENT_SKIP_REQUET, this.navigateExperimentSkip);
		ExperimentEventBus.$on(experimentEvents.EVENT_GO_BACK_REQUET, this.navigateBackAnInnerStep);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_READY, this.startExperiement);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_PRELUDE_OVER, this.displayFirstStep);
		ExperimentEventBus.$on(experimentEvents.EVENT_STATE_ENDED, this.navigateExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_ENDED, this.endExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);

		this.initializeControl();
	},
	beforeDestroy() {
		this.terminateControl();

		window.removeEventListener('keydown', this.handleButtonPress);
		window.removeEventListener('keyup', this.handleButtonRelease);
		ExperimentEventBus.$off(experimentEvents.EVENT_SKIP_REQUET, this.navigateExperimentSkip);
		ExperimentEventBus.$off(experimentEvents.EVENT_GO_BACK_REQUET, this.navigateBackAnInnerStep);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_READY, this.startExperiement);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_PRELUDE_OVER, this.displayFirstStep);
		ExperimentEventBus.$off(experimentEvents.EVENT_STATE_ENDED, this.navigateExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_ENDED, this.endExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);

		this.resetKeyboardTracking();
		this.resetPianoState();
		this.clearState();
	},
	watch: {
		midiName: {
			immediate: true,
			handler: function (midiName) {
				if (midiName !== '') this.loadMidiFile(this.midiName);
			},
		},

		referenceKeyboardKeys: {
			deept: true,
			immediate: true,
			handler: function (sequence) {
				if (sequence) this.loadReferenceKeyboardKeys();
			},
		},
	},
	beforeRouteLeave(to, from, next) {
		// We need to verify that the route departure is not a redirection, otherwise
		// a confirmation will be prompted twice (Once before and after the redirection)
		if (this.needsConfirmationToLeave && !Object.prototype.hasOwnProperty.call(to, 'redirectedFrom')) {
			const answer = window.confirm('views.experiment.context.confirm-leave');
			if (answer) next();
			else next(false);
		} else {
			next();
		}
	},
};
</script>

<style>
.unselectable {
	-webkit-touch-callout: none;
	-webkit-user-select: none;
	-khtml-user-select: none;
	-moz-user-select: none;
	-ms-user-select: none;
	user-select: none;
}

#experiment {
	height: 100%;
	background-color: rgb(15, 15, 15);
}

.status-bar-position {
	grid-area: status-bar;
}

.state-content-position {
	grid-area: state-content;
}

.experiment-grid {
	display: grid;
	grid-template-columns: auto;
	grid-template-rows: auto 1fr;
	grid-template-areas:
		'status-bar'
		'state-content';
	grid-gap: 0px;
}

#state-content {
	box-shadow: 0 0 25px 0 rgb(0, 0, 0);
	background-color: black;
	overflow: auto;
	margin: 25px;
}
</style>
