<template>
  <div id="the-piano" class="piano">
    <div id="piano-display" v-if="display" :class="color">
      <svg class="piano-icon">
        <use xlink:href="sprites.svg#icon-piano" />
      </svg>
      &nbsp;{{soundStatus}}
    </div>
  </div>
  <!-- <footer v-if="appSoundInited && !useMidiInput">{{currentOctave}}</footer> -->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MidiPlayer from "@/MidiPlayer";
import map from "@/_helpers/keyboardMapping";

export default {
  name: "ThePiano",
  props: {
    display: {
      type: Boolean,
      default() {
        return false;
      }
    },
    pianoDataBus: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  data() {
    return {
      audioConctext: null,
      piano: null,
      pianoInited: false,
      playingNotes: {},
      currentOctave: 4, // FIXME: This should be directly in the keyboard mapping
      keyboardTracker: {} // Keeps track of keydown and keyup events for each key
    };
  },
  computed: {
    ...mapGetters("piano", ["player"]),
    ...mapGetters("experiment", [
      "timbreFile",
      "anyPianoKey",
      "enableSoundFlag"
    ]),
    soundStatus() {
      if (!this.pianoInited) return "LOAD...";
      return this.enableSoundFlag ? "ON" : "OFF";
    },
    color() {
      if (!this.pianoInited) return "not-ready";
      return this.enableSoundFlag ? "active" : "inactive";
    }
  },
  methods: {
    ...mapActions("piano", [
      "addPressedKey",
      "deletePressedKey",
      "setPlayer",
      "addPressedNoteLog",
      "addReleasedNoteLog"
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
        type: midiNote.data[0] === 144 ? "Note On" : "Note Off",
        note: midiNote.data[1],
        velocity: midiNote.data[2]
      };
      switch (midiMessage.type) {
        case "Note On":
          // We turn off all the other notes previous notes (Only one active note at the time)
          for (let otherNote in this.playingNotes) {
            if (otherNote !== midiMessage.note) {
              this.stopNote(otherNote);
              this.recordKeyReleased(otherNote);
            }
          }
          // We activate the specified note
          if (this.enableSoundFlag) this.playNote(midiMessage.note);
          this.recordKeyPress(midiMessage);
          this.addPressedKey(midiMessage.note);
          break;
        case "Note Off":
          // If the note was still active, we deactivate it
          if (this.playingNotes[midiMessage.note]) {
            this.stopNote(midiMessage.note);
            this.recordKeyReleased(midiMessage.note);
          }
          this.deletePressedKey(midiMessage.note);
          break;
        default:
          break;
      }
    },
    playNote(note) {
      this.playingNotes[note] = this.piano.play(note, 0, {
        gain: vel => {
          return vel / 127;
        }
      }); // GainNode
    },
    stopNote(note) {
      this.playingNotes[note].stop();
      delete this.playingNotes[note];
    },
    recordKeyPress(midiMessage) {
      this.addPressedNoteLog({
        volume: this.enableSoundFlag, //TODO: Integrate the volume concept
        note: midiMessage.note,
        time: new Date().getTime(),
        velocity: midiMessage.velocity
      });

      // If the component is connected to the piano bus, we emit the key press event
      if (this.pianoDataBus !== null)
        this.pianoDataBus.$emit("pianoKeyPress", midiMessage.note);
    },
    recordKeyReleased(note) {
      this.addReleasedNoteLog({
        note: note,
        time: new Date().getTime()
      });

      // If the component is connected to the piano bus, we emit the key release event
      if (this.pianoDataBus !== null)
        this.pianoDataBus.$emit("pianoKeyRelease", note);
    },
    toNote(e) {
      return map[e.key];
    },
    initPiano() {
      // Initialize audio
      this.audioConctext = new AudioContext();
      this.setPlayer(new MidiPlayer.Player());
      const soundfont = require("soundfont-player");
      soundfont.instrument(this.audioConctext, this.timbreFile).then(piano => {
        this.piano = piano;

        // MIDI input (piano) events
        window.navigator.requestMIDIAccess().then(midiAccess => {
          midiAccess.inputs.forEach(midiInput => {
            midiInput.onmidimessage = this.manageMidiNote;
          });
        });

        // Keyboard events listeners
        window.addEventListener("keydown", this.handleKeyPress);
        window.addEventListener("keyup", this.handleKeyRelease);

        // Midi messages listener (To automatically play a MIDI file)
        this.player.on("midiEvent", this.handleMidiMessage);

        this.pianoInited = true;
      });
    },
    handleKeyPress(key) {
      const note = this.toNote(key);
      // PianokeyDown => 'Note On'
      // If the key doesn't exist in the midi map, or we're trying to send a
      // noteOn event without having most recently sent a noteOff, end here.
      if (note === undefined || this.keyboardTracker[note]) return;
      this.keyboardTracker[note] = true;
      this.manageMidiNote({ data: [144, note, 127] });
    },
    handleKeyRelease(key) {
      switch (key.code) {
        // Octave down
        case "ShiftLeft": {
          this.currentOctave -= 1;
          for (let mapKey in map) {
            if (mapKey !== " ") map[mapKey] -= 12;
          }
          break;
        }
        // Octave up
        case "ShiftRight": {
          this.currentOctave += 1;
          for (let mapKey in map) {
            if (mapKey !== " ") map[mapKey] += 12;
          }
          break;
        }
        // Piano keyUp  => 'Note Off'
        default: {
          const note = this.toNote(key);
          if (note !== undefined) {
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
     * @param {String} midiMessage.name       Midi message type (Time Signature, Key Signature, Set Tempo, 
     *                                        Controller change, Program Change, Midi Port, Note on, undefined)
     * @param {String} midiMessage.noteName   Name of the note played (eg. G4, A4, C5)
     * @param {Number} midiMessage.noteNumber Midi number of the note (eg. 67, 69, 72)
     * @param {Boolean} midiMessage.running   Boolean value
     * @param {Number} midiMessage.tick       Number of ticks during the idi file playing 
     * @param {Number} midiMessage.track      Track number
     * @param {Number} velocity               Velocity of the note (There is no "Note off" midi message. A note
     *                                        is turned off when there is a midi message for that note with a
     *                                        velocity of 0)
     */
    handleMidiMessage(midiMessage) {
      if (midiMessage.name == "Note on") {
        const currTime = this.audioConctext.currentTime;
        this.piano.play(midiMessage.noteName, currTime, {
          gain: midiMessage.velocity / 127,
          duration: 1
        });
        // If the component is connected to the piano bus, we emit the midi messages
        if (this.pianoDataBus !== null)
          this.pianoDataBus.$emit("midiFileSignal", {isMidiMessage: true, payload: midiMessage});
      }
      console.log(
        `MidiMessage | byteIndex: ${midiMessage.byteIndex}; channel: ${midiMessage.channel}; delta: ${midiMessage.delta};  name: ${midiMessage.name}; noteName: ${midiMessage.noteName}; noteNumber : ${midiMessage.noteNumber}; running: ${midiMessage.running}; tick: ${midiMessage.tick}; track: ${midiMessage.track}; velocity: ${midiMessage.velocity}`
      );
    }
  },
  mounted() {
    // Verifying MIDI support
    if (navigator.requestMIDIAccess) {
      console.log("This browser supports WebMIDI!");
      this.initPiano();
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyPress);
    window.removeEventListener("keyup", this.handleKeyRelease);
  },
  watch: {
    pianoDataBus() {
      // Adding a custom signal at the end of the last note (Because the library used to play
      // midi files does not emit a midi message for the end of the last note and it is
      // necessary to emit a signal on the piano bus to indicate the end of hte last note)
      this.player.on("endOfFile", () => {
        if (this.pianoDataBus !== null)
          this.pianoDataBus.$emit("midiFileSignal", {isMidiMessage: false, payload: "endOfFile"});
      });
    }
  }
};
</script>

<style>
#piano-display {
  display: flex;
  align-items: center;
  height: 100%;
}
.piano-icon {
  display: inline-block;
  stroke-width: 1px;
  width: 40px;
  height: 40px;
}
.active {
  stroke: rgb(0, 200, 0);
  fill: rgb(0, 200, 0);
  color: rgb(0, 200, 0);
}
.inactive {
  stroke: rgb(200, 0, 0);
  fill: rgb(200, 0, 0);
  color: rgb(200, 0, 0);
}
.not-ready {
  stroke: rgb(100, 100, 100);
  fill: rgb(100, 100, 100);
  color: rgb(100, 100, 100);
}
</style>