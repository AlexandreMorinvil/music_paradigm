<template>
	<div style="display: none"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { KeyboardEventBus, keyboardEvents } from '@/_services/keyboard-event-bus.service.js';

export default {
	data() {
		return {
			playingNotes: {},
			keyboardTracker: {}, // Keeps track of keydown and keyup events for each key
		};
	},
	computed: {
		...mapGetters('keyboard', ['isKeyBoardInitialized', 'isKeyboardPaused', 'pressedKeyboardKeys', 'referenceKeys']),
	},
	methods: {
		...mapActions('keyboard', [
			'setInitializedState',
			'addPressedKeyLog',
			'addReleasedKeyLog',
			'addMidiFileTriggeredKey',
			'deleteReferenceTriggeredKey',
			'deleteAllReferenceTriggeredKey',
		]),
		/**
		 * Handle the midi messages
		 * @param {Object} midiNote
		 * @param {Boolean} midiNote.isPressed  WHether it's a keypress or a key release
		 * @param {Number} midiNote.key  		Keyboard value
		 */
		manageKeyPress(keyEvent) {
			// We turn off all the other notes previous notes (Only one active note at the time) and we activate the specified note
			if (keyEvent.isPressed) {
				for (const otherNote in this.pressedKeyboardKeys)
					if (otherNote !== keyEvent.key && this.pressedKeyboardKeys.includes(otherNote)) this.recordKeyReleased(otherNote);
				this.recordKeyPress(keyEvent);
			}
			// If the note was still active, we deactivate it
			else if (this.pressedKeyboardKeys.includes(keyEvent.note)) {
				this.recordKeyReleased(keyEvent.note);
			}
		},
		recordKeyPress(keyEvent) {
			this.addPressedKeyLog({
				key: keyEvent.key,
				time: new Date().getTime(),
			});
		},
		recordKeyReleased(key) {
			this.addReleasedNoteLog({
				note: key,
				time: new Date().getTime(),
			});
		},
		initKeyboardTracker() {
			if (this.isKeyBoardInitialized) return;
			this.setInitializingState(true);

			// Keyboard events listeners
			window.addEventListener('keydown', this.handleKeyPress);
			window.addEventListener('keyup', this.handleKeyRelease);

			this.setInitializedState(true);
		},
		handleKeyPress(keyEvent) {
			// If the key was already pressed, we ignore this signal (should never happen)
			if (this.keyboardTracker[keyEvent.key]) return;
			this.keyboardTracker[keyEvent.key] = true;
			this.manageMidiNote({ isPressed: true, key: keyEvent.key });
		},
		handleKeyRelease(keyEvent) {
			this.keyboardTracker[keyEvent.key] = false;
			this.manageMidiNote({ isPressed: false, key: keyEvent.key });
		},
		terminateKeyboardTracker() {
			this.setInitializedState(false);
			window.removeEventListener('keydown', this.handleKeyPress);
			window.removeEventListener('keyup', this.handleKeyRelease);
		},
	},
	mounted() {
		KeyboardEventBus.$on(keyboardEvents.EVENT_TRACKER_INIT_REQUEST, this.initPiano);
		KeyboardEventBus.$on(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST, this.terminateKeyboardTracker);
	},
	beforeDestroy() {
		this.terminateKeyboardTracker();
		KeyboardEventBus.$off(keyboardEvents.EVENT_TRACKER_INIT_REQUEST, this.initPiano);
		KeyboardEventBus.$off(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST, this.terminateKeyboardTracker);
	},
};
</script>

<style></style>
