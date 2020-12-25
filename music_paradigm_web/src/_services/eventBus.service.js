import Vue from 'vue';

export const ExperimentEventBus = new Vue();

export const events = {
	EVENT_SKIP_REQUET: 'skip-request',
	EVENT_EXPERIMENT_READY: 'experiment-ready',
	EVENT_STATE_ENDED: 'state-ended',
	EVENT_EXPERIMENT_ENDED: 'end-experiment',
};
