<template>
	<div style="display: none"></div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import { PianoEventBus, pianoEvents } from '@/_services/piano-event-bus.service.js';
import MidiPlayer from '@/MidiPlayer';
import map from '@/_helpers/keyboardMapping';

export default {
	data() {
		return {
			player: null,
			audioConctext: null,
			piano: null,
			playingNotes: {},
			currentOctave: 4, // FIXME: This should be directly in the keyboard mapping
			keyboardTracker: {}, // Keeps track of keydown and keyup events for each key
			midiAccess: null,
			midiInputs: [],
		};
	},
	computed: {
		...mapGetters('piano', ['isPianoInitialized', 'isPianoInitializing', 'isPianoPaused', 'pressedKeys', 'midiFileNotesName']),
		...mapGetters('experiment', ['timbreFile', 'enableSoundFlag', 'midiOffset']),
	},
	methods: {
		...mapActions('piano', [
			'setInitializedState',
			'setInitializingState',
			'setPlayer',
			'setPiano',
			'clearPlayer',
			'clearPiano',
			'addPlayerEndOfFileAction',
			'removePlayerEndOfFileAction',
			'addPressedKey',
			'deletePressedKey',
			'addPressedNoteLog',
			'addReleasedNoteLog',
			'addMidiFileTriggeredKey',
			'deleteMidiFileTriggeredKey',
			'deleteAllMidiFileTriggeredKey',
		]),

		/**
		 * Handle the midi messages
		 * @param {Object} midiNote
		 * @param {String} midiNote.data[0] 144 for "Note On" or 128 for "Note Off"
		 * @param {Number} midiNote.data[1] Value between 0-127
		 * @param {Number} midiNote.data[2] Value between 0-127
		 */
		manageMidiNote(midiNote) {
			const midiMessage = {
				type: midiNote.data[0] === 144 ? 'Note On' : 'Note Off',
				note: midiNote.data[1] + this.midiOffset,
				velocity: midiNote.data[2],
			};

			// Additional support for MIDI protocoles using a velocity === 0 as a Note Off signal
			if (midiMessage.velocity === 0) midiMessage.type = 'Note Off';

			switch (midiMessage.type) {
				case 'Note On':
					// We turn off all the other notes previous notes (Only one active note at the time)
					for (const otherNote in this.pressedKeys) {
						if (otherNote !== midiMessage.note) {
							if (Object.values(this.playingNotes).includes(otherNote)) this.stopNote(otherNote);
							if (this.pressedKeys.includes(otherNote)) this.recordKeyReleased(otherNote);
						}
					}

					// We activate the specified note
					if (this.enableSoundFlag && !this.isPianoPaused) this.playNote(midiMessage.note);
					this.recordKeyPress(midiMessage);
					break;

				case 'Note Off':
					// If the note was still active, we deactivate it
					if (this.playingNotes[midiMessage.note]) this.stopNote(midiMessage.note);
					if (this.pressedKeys.includes(midiMessage.note)) this.recordKeyReleased(midiMessage.note);
					break;

				default:
					break;
			}
		},
		playNote(note) {
			this.playingNotes[note] = this.piano.play(note, 0, {
				gain: (vel) => {
					return vel / 127;
				},
			});
		},
		stopNote(note) {
			this.playingNotes[note].stop();
			delete this.playingNotes[note];
		},
		recordKeyPress(midiMessage) {
			this.addPressedKey(midiMessage.note);
			this.addPressedNoteLog({
				volume: this.enableSoundFlag,
				note: midiMessage.note,
				time: new Date().getTime(),
				velocity: midiMessage.velocity,
			});
		},
		recordKeyReleased(note) {
			this.deletePressedKey(note);
			this.addReleasedNoteLog({
				note: note,
				time: new Date().getTime(),
			});
		},
		toNote(e) {
			return map[e.key];
		},
		playNoteFromMidiFile(noteName, velocity) {
			const currentTime = this.audioConctext.currentTime;
			this.piano.play(noteName, currentTime, {
				gain: velocity / 127,
				duration: 1,
			});
		},
		stopNoteFromMidiFile(noteName) {
			const currentTime = this.audioConctext.currentTime;
			this.piano.play(noteName, currentTime, {
				gain: 0,
				duration: 1,
			});
		},
		initPiano() {
			if (this.isPianoInitialized || this.isPianoInitializing) return;
			this.setInitializingState(true);

			// Initialize audio
			this.audioConctext = new AudioContext();
			this.player = new MidiPlayer.Player();
			this.setPlayer(this.player);
			const soundfont = require('soundfont-player');
			soundfont.instrument(this.audioConctext, this.timbreFile).then((piano) => {
				this.piano = piano;
				this.setPiano(piano);

				// MIDI input (piano) events
				window.navigator.requestMIDIAccess().then((midiAccess) => {
					this.midiAccess = midiAccess.inputs.forEach((midiInput) => {
						midiInput.onmidimessage = this.manageMidiNote;
						this.midiInputs.push(midiInput);
					});
				});

				// Keyboard events listeners
				window.addEventListener('keydown', this.handleKeyPress);
				window.addEventListener('keyup', this.handleKeyRelease);

				// Midi messages listener (To handle played automatically MIDI files)
				this.player.on('midiEvent', this.handleMidiMessage);
				this.player.on('endOfFile', this.handleMidiFileEndOfFile);

				this.setInitializedState(true);
				this.setInitializingState(false);
			});
		},
		handleKeyPress(key) {
			const note = this.toNote(key);
			// PianokeyDown => 'Note On'
			// If the key doesn't exist in the midi map, or we're trying to send a
			// noteOn event without having most recently sent a noteOff, end here.
			if (!note || this.keyboardTracker[note]) return;
			this.keyboardTracker[note] = true;
			this.manageMidiNote({ data: [144, note, 127] });
		},
		handleKeyRelease(key) {
			switch (key.code) {
				// Octave down
				case 'ShiftLeft': {
					this.currentOctave -= 1;
					for (const mapKey in map) {
						if (mapKey !== ' ') map[mapKey] -= 12;
					}
					break;
				}
				// Octave up
				case 'ShiftRight': {
					this.currentOctave += 1;
					for (const mapKey in map) {
						if (mapKey !== ' ') map[mapKey] += 12;
					}
					break;
				}
				// Piano keyUp  => 'Note Off'
				default: {
					const note = this.toNote(key);
					if (note) {
						this.keyboardTracker[note] = false;
						this.manageMidiNote({ data: [128, note, 127] });
					}
				}
			}
		},
		/**
		 * Hanfling the midi messages to play a midi file
		 * @param {Object} midiMessage            The midi message that will be handled
		 * @param {Number} midiMessage.byteIndex  Number of the byte inted in the midi file
		 * @param {Number} midiMessage.channel    Channel as specified by the midi file (eg. 1, undefined)
		 * @param {Number} midiMessage.delta      Number of ticks since the last midi message
		 * @param {String} midiMessage.name       Midi message type (Time Signature, Key Signature, Set Tempo, Controller change,
		 *                                        Program Change, Midi Port, Note on, Note off, undefined)
		 * @param {String} midiMessage.noteName   Name of the note played (eg. G4, A4, C5)
		 * @param {Number} midiMessage.noteNumber Midi number of the note (eg. 67, 69, 72)
		 * @param {Boolean} midiMessage.running   Boolean value
		 * @param {Number} midiMessage.tick       Number of ticks during the idi file playing
		 * @param {Number} midiMessage.track      Track number
		 * @param {Number} velocity               Velocity of the note (In some MIDI files, there is no "Note off" midi message. A note
		 *                                        is then turned off when there is a midi message for that note with a velocity of 0)
		 */
		handleMidiMessage(midiMessage) {
			if (midiMessage.name === 'Note on') {
				this.playNoteFromMidiFile(midiMessage.noteName, midiMessage.velocity);
				if (midiMessage.velocity === 0) this.deleteMidiFileTriggeredKey(midiMessage.noteNumber);
				else this.addMidiFileTriggeredKey(midiMessage.noteNumber);
			} else if (midiMessage.name === 'Note off') {
				this.stopNoteFromMidiFile(midiMessage.noteName);
				this.deleteMidiFileTriggeredKey(midiMessage.noteNumber);
			}
		},
		handleMidiFileEndOfFile() {
			// At the end of the last note, we enforce the turning off of the midi file triggered
			// notes in our Vuex data. The reason is because the library used to play midi files
			// does not emit a midi message for the end of the last note, therefore we would always
			// have a last note turned on if we do not turn all the notes off at the end of the file
			this.deleteAllMidiFileTriggeredKey();

			// We also stop the playing of the last note manually
			const lastNoteName = this.midiFileNotesName[this.midiFileNotesName.length - 1];
			this.stopNoteFromMidiFile(lastNoteName);
		},
		terminatePiano() {
			window.removeEventListener('keydown', this.handleKeyPress);
			window.removeEventListener('keyup', this.handleKeyRelease);
			if (this.player) {
				this.player.off('midiEvent', this.handleMidiMessage);
				this.player.off('endOfFile', this.handleMidiFileEndOfFile);
				this.player = null;
				this.clearPlayer();
			}
			this.clearPiano();
			while (this.midiInputs.length > 0) this.midiInputs.pop().onmidimessage = null;
			this.midiAccess = null;
			this.setInitializedState(false);
			this.setInitializingState(false);
		},
		probeCompatibility() {
			// Verifying MIDI support
			if (navigator.requestMIDIAccess) console.log('This browser supports WebMIDI!');
			else console.log('WebMIDI is not supported in this browser.');
		},
	},
	mounted() {
		this.probeCompatibility();
		PianoEventBus.$on(pianoEvents.EVENT_PIANO_INIT_REQUEST, this.initPiano);
		PianoEventBus.$on(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST, this.terminatePiano);
	},
	beforeDestroy() {
		this.terminatePiano();
		PianoEventBus.$off(pianoEvents.EVENT_PIANO_INIT_REQUEST, this.initPiano);
		PianoEventBus.$off(pianoEvents.EVENT_PIANO_TERMINATE_REQUEST, this.terminatePiano);
	},
};
</script>

<style></style>
