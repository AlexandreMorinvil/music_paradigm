import Vue from 'vue';

export const ExperimentEventBus = new Vue();

export const experimentEvents = {
	EVENT_EXPERIMENT_READY: 'experiment-ready',
	EVENT_EXPERIMENT_ENDED: 'experiment-ended',
	EVENT_SKIP_REQUET: 'skip-request',
	EVENT_STATE_ENDED: 'state-ended',
	EVENT_TIMES_UP: 'times-up',

	EVENT_SET_FOOTNOTE: 'set-footnote',
	EVENT_OVERIDE_FOOTNOTE: 'overide-footnote',
};
