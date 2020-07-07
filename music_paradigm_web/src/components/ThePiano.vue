<template>
  <div id="the-piano" class="piano"></div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import MidiPlayer from "@/MidiPlayer";
import map from "@/_helpers/keyboardMapping";

export default {
  name: "ThePiano",
  data() {
    return {
      audioConctext: null,
      piano: null,
      pianoInited: false,
      playingNotes: {},
      currentOctave: 4,
      keyboardTracker: {}   // Keeps track of keydown and keyup events for each key
    };
  },
  computed: {
    ...mapState(["mustInitApplication"]),
    ...mapGetters("piano", ["player"]),
    ...mapGetters("experiment", [
      "timbreFile",
      "anyPianoKey",
      "enableSoundFlag"
    ])
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
      // HACK: Put the space bar out of the piano
      if (midiMessage.note === 1) {
        this.addPressedKey(midiMessage.note);
        // this.deletePressedKey(midiMessage.note);
        return;
      }
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
    },
    recordKeyReleased(note) {
      this.addReleasedNoteLog({
        note: note,
        time: new Date().getTime()
      });
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

        console.log("Sound inited");
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
            this.manageMidiNote({ data: [128, note, 127] }); // FIXME: change the pressure sensitivity here
          }
        }
      }
    },
    handleMidiMessage(midiMessage) {
      if (midiMessage.name == "Note on") {
        const currTime = this.audioConctext.currentTime;
        this.piano.play(midiMessage.noteName, currTime, {
          gain: midiMessage.velocity / 127,
          duration: 1
        });
      }
    }
  },
  mounted: function() {
    // Verifying MIDI support
    if (navigator.requestMIDIAccess) {
      console.log("This browser supports WebMIDI!");
    } else {
      console.log("WebMIDI is not supported in this browser.");
    }
  },
  watch: {
    mustInitApplication() {
      if (this.mustInitApplication) {
        this.initPiano();
        this.pianoInited = true;
      }
    }
  }
};
</script>


<style>
</style>