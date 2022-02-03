import Vue from 'vue';

export const PianoEventBus = new Vue();

export const pianoEvents = {
	EVENT_PIANO_INIT_REQUEST: 'initialize-piano',
	EVENT_PIANO_TERMINATE_REQUEST: 'terminate-piano',
	EVENT_PIANO_SIMULATED_MIDI_SIGNAL: 'simulated-midi-signal',
};
