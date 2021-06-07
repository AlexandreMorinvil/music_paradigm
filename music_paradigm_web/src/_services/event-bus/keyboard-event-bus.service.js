import Vue from 'vue';

export const KeyboardEventBus = new Vue();

export const keyboardEvents = {
	EVENT_TRACKER_INIT_REQUEST: 'initialize-keyboard-tracker',
	EVENT_TRACKER_TERMINATE_REQUEST: 'terminate-keyboard-tracker',
};
