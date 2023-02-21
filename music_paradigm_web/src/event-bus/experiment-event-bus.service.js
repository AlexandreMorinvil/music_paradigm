import Vue from 'vue';

export const ExperimentEventBus = new Vue();

export const experimentEvents = {
	EVENT_EXPERIMENT_READY: 'experiment-ready',
	EVENT_EXPERIMENT_REACHED_CONCLUSION: 'experiment-reached-conclusion',
	EVENT_EXPERIMENT_ENDED: 'experiment-ended',
	EVENT_EXPERIMENT_PRELUDE_OVER: 'experiment-prelude-over',
	EVENT_SKIP_REQUET: 'skip-request',
	EVENT_GO_BACK_REQUET: 'go-back-request',
	EVENT_ADVANCE_REQUEST: 'advance-request',
	EVENT_STATE_ENDED: 'state-ended',
	EVENT_SESSION_ABORTED: 'session-aborted',
	EVENT_TIMES_UP: 'times-up',
	EVENT_START_SIGNAL_READY: 'start-signal-ready',

	EVENT_SET_FOOTNOTE: 'set-footnote',
	EVENT_OVERIDE_FOOTNOTE: 'overide-footnote',

	EVENT_NEW_TIME_LEFT_MESSAGE: 'new-time-left-message',
};
