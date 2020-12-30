<template>
	<div id="experiment" class="experiment-grid unselectable">
		<status-bar-component class="status-bar-position" ref="status" />

		<div id="state-content" class="state-content-position">
			<experiment-content :lastPressedKey="lastPressedKey" :isSpaceBarPressed="isSpaceBarPressed" />
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { ExperimentEventBus, experimentEvents } from '@/_services/experiment-event-bus.service.js';
import { PianoEventBus, pianoEvents } from '@/_services/piano-event-bus.service.js';
import ExperimentContent from '@/components/content-frame/experiment-content-frame.component.vue';
import StatusBarComponent from '@/components/experiment/status-bar/status-bar.component.vue';

export default {
	components: {
		ExperimentContent,
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
		...mapGetters('experiment', ['midiName']),
		currentStateIcon() {
			return this.getIconReference(this.currentStateType);
		},
		nextStateIcon() {
			return this.getIconReference(this.nextStateType);
		},
	},
	methods: {
		...mapActions('experiment', ['updateState', 'goNextStep', 'goStepPostSkip', 'clearState', 'endExperimentByTimeout', 'concludeExperiment']),
		...mapActions('piano', ['loadMidiFile', 'resetPlayedNotesLogs', 'resetPianoState']),
		...mapActions('log', ['initializeLogSession']),
		handleTimesUp() {
			this.endExperimentByTimeout();
		},
		displayFirstStep() {
			// This.initializeLogSession();
			this.updateState();
			this.$refs.status.start();
		},
		navigateExperiment() {
			this.resetPlayedNotesLogs();
			this.goNextStep();
		},
		navigateExperimentSkip() {
			this.resetPlayedNotesLogs();
			this.goStepPostSkip();
		},
		endExperiment() {
			this.needsConfirmationToLeave = false;
			this.concludeExperiment();
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
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_READY, this.displayFirstStep);
		ExperimentEventBus.$on(experimentEvents.EVENT_STATE_ENDED, this.navigateExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_EXPERIMENT_ENDED, this.endExperiment);
		ExperimentEventBus.$on(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);

		PianoEventBus.$emit(pianoEvents.EVENT_PIANO_INIT_REQUEST);
	},
	beforeDestroy() {
		window.removeEventListener('keydown', this.handleButtonPress);
		window.removeEventListener('keyup', this.handleButtonRelease);
		ExperimentEventBus.$off(experimentEvents.EVENT_SKIP_REQUET, this.navigateExperimentSkip);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_READY, this.displayFirstStep);
		ExperimentEventBus.$off(experimentEvents.EVENT_STATE_ENDED, this.navigateExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_EXPERIMENT_ENDED, this.endExperiment);
		ExperimentEventBus.$off(experimentEvents.EVENT_TIMES_UP, this.handleTimesUp);

		PianoEventBus.$emit(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST);
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
	},
	beforeRouteLeave(to, from, next) {
		// We need to verify that the route departure is not a redirection, otherwise
		// a confirmation will be prompted twice (Once before and after the redirection)
		if (this.needsConfirmationToLeave && !Object.prototype.hasOwnProperty.call(to, 'redirectedFrom')) {
			const answer = window.confirm('Do you really want to leave the experiment in progress?');
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
