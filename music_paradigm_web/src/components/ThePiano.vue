<template>
  <div id="the-piano" class="piano">
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import MidiPlayer from "@/MidiPlayer/index.js";
import map from "@/_helpers/keyboardMapping";
import "@/config";
export default {
  name: "ThePiano",
  data() {
    return {
      audioConctext: null,
      piano: null,
      pianoInited: false,
      localStarteds: {},
      playFlag: false,
      finished: false,
      currentOctave: 0,
      // Quick fix
      previousKey: null,
      // The flags keeps track of keydown and keyup events for each key so that
      // the keydown event doesn't send messages repeatedly until keyup.
      flags: {}
    };
  },
  computed: {
    ...mapState(["mustInitApplication"]),
    ...mapState("piano", ["starteds", "player"]),
    // TODO: Take the timbreFile from the Experiment module to a module dedicated to the piano
    ...mapState("experiment", {
      timbreFile: state => state.settings.timbreFile
    }),
    ...mapGetters("experiment", ["anyPianoKey"])
  },
  methods: {
    ...mapActions("piano", [
      "addStarted",
      "deleteStarted",
      "setPlayer",
      "addPlayedNotes",
      "addPlayedDurations",
      "addPlayedOffsets",
      "addPlayedVelocities"
    ]),

    // msg is event with msg.data = [messageType, key, velocity]
    // messageType : 144 noteon, 128 noteoff
    // key         : value between 0-127
    // velocity    : value between 0-127
    // This is convention with this
    onMidiMessage(msg) {
      const mm = {
        messageType: msg.data[0] == 144 ? "noteon" : "noteoff",
        key: msg.data[1],
        velocity: msg.data[2]
      };

      if (mm.messageType === "noteon" && mm.velocity < 20) {
        //for accidental press
        mm.messageType = "noteoff";
      }
      switch (mm.messageType) {
        case "noteon":
          // TODO: Put in a place where it is easier to toggle on and of the piano
          // this.playFlag = this.experiment.currentFlowState
          //   ? this.experiment.currentFlowState.hasOwnProperty("enableSoundFlag")
          //   : false;
          if (this.$route.name === "playing") {
            // || this.playFlag === true) {

            // TODO : Take the finished out of here, if it is not useful
            if (mm.key === 1 /*|| this.experiment.finished == true*/) break;
            // Fix here

            // Quick fix
            if (
              this.previousKey !== null &&
              this.localStarteds[this.previousKey]
            ) {
              this.localStarteds[this.previousKey].stop();
              delete this.localStarteds[this.previousKey];
              this.addPlayedOffsets(new Date().getTime());
            }
            this.localStarteds[mm.key] = this.piano.play(mm.key, 0, {
              gain: vel => {
                return vel / 127;
              }
            }); // GainNode
            this.addPlayedNotes(mm.key);
            this.addPlayedDurations(new Date().getTime());
            this.addPlayedVelocities(mm.velocity);
            this.previousKey = mm.key;
          } else if (mm.key === 1 || this.anyPianoKey) {
            // space bar or
            // any piano key by adding 'anyPianoKey: 1' in .config
            this.addStarted(mm.key);
          }
          break;
        case "noteoff":
          if (mm.key === 1) break;
          if (this.localStarteds[mm.key]) {
            this.localStarteds[mm.key].stop();
            delete this.localStarteds[mm.key];
            this.addPlayedOffsets(new Date().getTime());
          }

          this.deleteStarted(mm.key);
          break;
      }
    },
    toNote(e) {
      // Check the event key against the midi map.
      return map[e.key];
    },
    initPiano() {
      // Initialize audio
      this.audioConctext = new AudioContext();
      const soundfont = require("soundfont-player");
      this.setPlayer(new MidiPlayer.Player());

      // TODO: Solve the below problem :
      // Error: Loading chunk vendors~about failed.
      // This error can happen with the timbreFile
      soundfont.instrument(this.audioConctext, this.timbreFile).then(piano => {
        this.piano = piano;

        // MIDI input (piano) events
        window.navigator.requestMIDIAccess().then(midiAccess => {
          // console.log(midiAccess.inputs.values())
          midiAccess.inputs.forEach(midiInput => {
            midiInput.onmidimessage = this.onMidiMessage;
          });
        });

        // Keyboard events listeners
        window.addEventListener("keydown", this.interpretKeyPress);
        window.addEventListener("keyup", this.interpretKeyRelease);

        // Midi messages listener (To automatically play a MIDI file)
        this.player.on("midiEvent", this.handleMidiMessage);

        console.log("Sound inited");
      });
    },
    interpretKeyPress(key) {
      //keyDown = noteOn
      const note = this.toNote(key);

      // If the key doesn't exist in the midi map, or we're trying to send a
      // noteOn event without having most recently sent a noteOff, end here.
      if (note === undefined || this.flags[note]) return;
      this.flags[note] = true;
      this.onMidiMessage({ data: [144, note, 127] });
    },
    interpretKeyRelease(key) {
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
        // Piano keyUp = noteOff
        default: {
          const note = this.toNote(key);
          if (note !== undefined) {
            this.flags[note] = false;
            this.onMidiMessage({ data: [128, note, 127] });
          }
        }
      }
    },
    handleMidiMessage(midiMessage) {
      if (midiMessage.name == "Note on") {
        const currTime = this.audioConctext.currentTime;
        // change the pressure sensitivity here
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
/* * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  } */
body {
  /* font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4; */
  background-color: black;
  color: white;
}
* {
  font-size: 1.3rem;
}
footer {
  position: fixed;
  right: 0;
  bottom: 0;
  color: white;
  font-size: 0.8rem;
}
</style>