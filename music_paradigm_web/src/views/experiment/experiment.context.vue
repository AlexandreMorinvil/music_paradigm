<template>
	<div id="experiment" class="experiment-context experiment-grid unselectable"
		:class="{ 'experiment-context-clear': isClearVersion }">
		<keyboard-to-midi-input-mapper-component style="display: none" />
		<midi-input-to-keyboard-mapper-component style="display: none" />

		<keyboard-input-tracker-component style="display: none" />
		<piano-input-handler-component style="display: none" />

		<loaded-content-component style="display: none" />

		<log-component style="display: none" ref="log" />
		<session-component style="display: none" ref="session" />
		<time-left-message-component class="time-left-message-position" />
		<status-bar-component v-show="hasStatusBarVisible" ref="status" class="status-bar-position" />
		<div id="state-content" class="state-content state-content-position"
			:class="{ 'state-content-clear': isClearVersion }">
			<experiment-content :lastPressedKey="lastPressedKey" :isSpaceBarPressed="isSpaceBarPressed" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/event-bus/experiment-event-bus.service.js';
import { KeyboardEventBus, keyboardEvents } from '@/event-bus/keyboard-event-bus.service.js';
import { PianoEventBus, pianoEvents } from '@/event-bus/piano-event-bus.service.js';

import { fullScreen } from '@/_helpers';

import ExperimentContent from '@/components/content-frame/experiment-content-frame.component.vue';
import LoadedContentComponent from '@/components/experiment/session/loaded-content.component.vue';
import LogComponent from '@/components/experiment/log/log.component.vue';
import SessionComponent from '@/components/experiment/session/session.component.vue';
import StatusBarComponent from '@/components/experiment/status-bar/status-bar.component.vue';
import TimeLeftMessageComponent from '@/components/experiment/element/time-left-message.component.vue';

import KeyboardInputTrackerComponent from '@/components/controller/keyboard/keyboard-input-tracker.component.vue';
import PianoInputHandlerComponent from '@/components/controller/piano/piano-input-handler.component.vue';

import KeyboardToMidiInputMapperComponent from '@/components/controller/keyboard-to-midi-input-mapper.component.vue';
import MidiInputToKeyboardMapperComponent from '@/components/controller/midi-input-to-keyboard-mapper.component.vue';

export default {
	components: {

		ExperimentContent,
		LoadedContentComponent,
		LogComponent,
		SessionComponent,
		StatusBarComponent,
		TimeLeftMessageComponent,

		KeyboardToMidiInputMapperComponent,
		MidiInputToKeyboardMapperComponent,

		KeyboardInputTrackerComponent,
		PianoInputHandlerComponent,
	},
	data() {
		return {
			isTaskStarted: false,
			isTaskStarting: false,
			isTimerAllowedToCount: false,
			hasConlcluded: false,
			needsConfirmationToLeave: true,
			isSpaceBarPressed: false,
			lastPressedKey: '',
		};
	},
	computed: {
		...mapGetters('experiment', [
			'isFullScreen',
			'hasStatusBar',
			'hasClearBackground',
			'hasTimeLeftMessages',
			'hasPrelude',
			'isInMainFlow',
			'mustInitializePianoInputHandler',
			'considerExperimentFinished',
		]),
		hasStatusBarVisible() {
			return this.hasStatusBar;
		},
		isClearVersion() {
			return this.hasClearBackground;
		},
		isTimerRunning() {
			return this.isInMainFlow && this.isTimerAllowedToCount;
		},
	},
	methods: {
		...mapActions('experiment', [
			'initializePrelude',
			'updateState',
			'goNextStep',
			'goPreviousInnerStep',
			'goStepPostSkip',
			'clearState',
			'endExperimentByTimeUp',
			'leaveExperiment',
			'setTimesUpStatus',
		]),
		...mapActions('keyboard', ['resetPressedKeyboardKeysLogs', 'resetKeyboardTracking', 'deleteAllPressedKeyboardKeys']),
		...mapActions('piano', ['resetPlayedNotesLogs', 'resetPianoState', 'releasedAllNotesNotReleasedInLog', 'deleteAllPressedKeys']),
		...mapActions('soundGenerator', ['initializeSoundGenerator', 'terminateSoundGenerator']),
		initializeControl() {
			if (this.mustInitializePianoInputHandler) PianoEventBus.$emit(pianoEvents.EVENT_PIANO_INIT_REQUEST);
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_INIT_REQUEST);
		},
		terminateControl() {
			PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
			KeyboardEventBus.$emit(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST);
		},
		handleTimesUp() {
			// This action is called in a redundant way (in many places) as a security since we absolutely want
			// to make sure that the "time's up" status is recorded. (Otherwise, upon clompletion of a session,
			// the experimentMarker would be deleted, if we do not record properly that the session was simply
			// concluded by a lack of time).
			this.setTimesUpStatus();
			this.endExperimentByTimeUp();
		},
		startExperiement() {
			if (this.isTaskStarted || this.isTaskStarting) return;
			this.isTaskStarting = true;
			this.$refs.session.initialize();
			this.$refs.log.initialize();
			if (this.hasPrelude) {
				this.initializePrelude();
			} else this.updateState();
			this.isTimerAllowedToCount = true;
			this.isTaskStarted = true;
			this.isTaskStarting = false;
		},
		navigateExperiment() {
			this.$refs.status.recordTime();
			this.resetPresses();
			this.goNextStep();
			this.$refs.session.saveState();
		},
		navigateBackAnInnerStep() {
			this.resetPresses();
			this.goPreviousInnerStep();
		},
		navigateExperimentSkip() {
			this.$refs.status.recordTime();
			this.resetPresses();
			this.goStepPostSkip();
			this.$refs.session.saveState();
		},
		abortSession() {
			this.needsConfirmationToLeave = false;
			this.leaveExperiment();
		},
		concludeExperiment() {
			if (this.hasConlcluded) return;
			this.hasConlcluded = true;
			this.needsConfirmationToLeave = false;
			this.$refs.log.conclude();
			this.$refs.session.conclude();
		},
		leave() {
			this.leaveExperiment();
		},
		resetPresses() {
			this.releasedAllNotesNotReleasedInLog();
			this.$refs.log.addBlock();
			this.resetPressedKeyboardKeysLogs();
			this.resetPlayedNotesLogs();
			this.deleteAllPressedKeyboardKeys();
			this.deleteAllPressedKeys();
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
		ExperimentEventBus.$on(experimentEvents.EVENT_SESSION_ABORTED, this.abortSession);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_REACHED_CONCLUSION, this.concludeExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_ENDED, this.leaveExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);
		this.initializeSoundGenerator();
		this.initializeControl();
	},
	beforeDestroy() {
		if (this.considerExperimentFinished) this.concludeExperiment();
		this.terminateControl();

		window.removeEventListener('keydown', this.handleButtonPress);
		window.removeEventListener('keyup', this.handleButtonRelease);
		ExperimentEventBus.$off(experimentEvents.EVENT_SKIP_REQUET, this.navigateExperimentSkip);
		ExperimentEventBus.$off(experimentEvents.EVENT_GO_BACK_REQUET, this.navigateBackAnInnerStep);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_READY, this.startExperiement);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_PRELUDE_OVER, this.displayFirstStep);
		ExperimentEventBus.$off(experimentEvents.EVENT_STATE_ENDED, this.navigateExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_SESSION_ABORTED, this.abortSession);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_REACHED_CONCLUSION, this.concludeExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_ENDED, this.leaveExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);
		this.terminateSoundGenerator();
		this.resetKeyboardTracking();
		this.resetPianoState();
		this.clearState();
		fullScreen.leaveFullScreen();
	},
	watch: {
		isTimerRunning: {
			handler: function (shouldBeActive) {
				if (shouldBeActive) this.$refs.status.start();
				else this.$refs.status.stop();
			},
		},
		considerExperimentFinished: {
			immediate: true,
			handler: function (isConsideredFinished) {
				if (isConsideredFinished) this.concludeExperiment();
			},
		},
		isFullScreen: {
			immediate: true,
			handler: function (isOn) {
				if (isOn) fullScreen.enterFullScreen();
				else fullScreen.leaveFullScreen();
			},
		},
	},
	beforeRouteLeave(to, from, next) {
		// We need to verify that the route departure is not a redirection, otherwise
		// a confirmation will be prompted twice (Once before and after the redirection)
		if (this.needsConfirmationToLeave && !Object.prototype.hasOwnProperty.call(to, 'redirectedFrom')) {
			const answer = window.confirm(this.$t('views.experiment.context.confirm-leave'));
			if (answer) {
				if (this.considerExperimentFinished) this.concludeExperiment();
				next();
			} else next(false);
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

.experiment-context {
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

.state-content {
	overflow: auto;
	margin: 25px;
	box-shadow: 0 0 25px 0 rgb(0, 0, 0);
	background-color: black;
}

.experiment-context-clear {
	background-color: rgb(250, 250, 250);
}

.state-content-clear {
	box-shadow: 0 0 25px 0 rgb(255, 255, 255);
	background-color: rgb(255, 255, 255);
}

.state-content-clear * {
	color: rgb(80, 80, 80);
}

.time-left-message-position {
	position: fixed;
	transform: translateX(-50%);
	left: 50%;
}
</style>
