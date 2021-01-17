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
		...mapGetters('keyboard', ['isKeyboardInitialized', 'isKeyboardPaused', 'pressedKeyboardKeys']),
	},
	methods: {
		...mapActions('keyboard', [
			'setInitializedKeyboardTracking',
			'addPressedKeyboardKey',
			'deletePressedKeyboardKey',
			'addPressedKeyboardKeyLog',
			'addReleasedKeyboardKeyLog',
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
			else if (this.pressedKeyboardKeys.includes(keyEvent.key)) {
				this.recordKeyReleased(keyEvent.key);
			}
		},
		recordKeyPress(keyEvent) {
			this.addPressedKeyboardKey(keyEvent.key);
			this.addPressedKeyboardKeyLog({
				key: keyEvent.key,
				time: new Date().getTime(),
			});
		},
		recordKeyReleased(key) {
			this.deletePressedKeyboardKey(key);
			this.addReleasedKeyboardKeyLog({
				note: key,
				time: new Date().getTime(),
			});
		},
		initKeyboardTracker() {
			if (this.isKeyBoardInitialized) return;

			// Keyboard events listeners
			window.addEventListener('keydown', this.handleKeyPress);
			window.addEventListener('keyup', this.handleKeyRelease);

			this.setInitializedKeyboardTracking(true);
		},
		handleKeyPress(keyEvent) {
			const lowercaseKey = keyEvent.key.toLowerCase();
			if (!this.isLetterOrNumber(lowercaseKey)) return;
			// If the key was already pressed, we ignore this signal (should never happen)
			if (this.keyboardTracker[lowercaseKey]) return;
			this.keyboardTracker[lowercaseKey] = true;
			this.manageKeyPress({ isPressed: true, key: lowercaseKey });
		},
		handleKeyRelease(keyEvent) {
			const lowercaseKey = keyEvent.key.toLowerCase();
			if (!this.isLetterOrNumber(lowercaseKey)) return;
			this.keyboardTracker[lowercaseKey] = false;
			this.manageKeyPress({ isPressed: false, key: lowercaseKey });
		},
		terminateKeyboardTracker() {
			this.setInitializedKeyboardTracking(false);
			window.removeEventListener('keydown', this.handleKeyPress);
			window.removeEventListener('keyup', this.handleKeyRelease);
		},
		isLetterOrNumber(str) {
			return str.length === 1 && str.match(/^[a-z0-9]+$/i);
		},
	},
	mounted() {
		KeyboardEventBus.$on(keyboardEvents.EVENT_TRACKER_INIT_REQUEST, this.initKeyboardTracker);
		KeyboardEventBus.$on(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST, this.terminateKeyboardTracker);
	},
	beforeDestroy() {
		this.terminateKeyboardTracker();
		KeyboardEventBus.$off(keyboardEvents.EVENT_TRACKER_INIT_REQUEST, this.initKeyboardTracker);
		KeyboardEventBus.$off(keyboardEvents.EVENT_TRACKER_TERMINATE_REQUEST, this.terminateKeyboardTracker);
	},
};
</script>

<style></style>
