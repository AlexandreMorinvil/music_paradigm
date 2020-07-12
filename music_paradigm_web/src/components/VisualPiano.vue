<template>
  <!-- The HTML definition of this piano adapted from the open source project : https://codepen.io/zastrow/pen/oDBki -->
  <div id="visual-piano">
    <ul class="set">
      <li id="note-60" ref="61" class="white c"></li>
      <li id="note-61" ref="62" class="black cs"></li>
      <li id="note-63" ref="63" class="white d"></li>
      <li id="note-64" ref="64" class="black ds"></li>
      <li id="note-65" ref="65" class="white e"></li>
      <li id="note-66" ref="66" class="white f"></li>
      <li id="note-67" ref="67" class="black fs"></li>
      <li id="note-68" ref="68" class="white g"></li>
      <li id="note-69" ref="69" class="black gs"></li>
      <li id="note-70" ref="70" class="white a"></li>
      <li id="note-71" ref="71" class="black as"></li>
      <li id="note-72" ref="72" class="white b"></li>
      <li id="note-73" ref="73" class="white c"></li>
      <li id="note-74" ref="74" class="black cs"></li>
      <li id="note-75" ref="75" class="white d"></li>
      <li id="note-76" ref="76" class="black ds"></li>
      <li id="note-77" ref="77" class="white e"></li>
      <li id="note-78" ref="78" class="white f"></li>
      <li id="note-79" ref="79" class="black fs"></li>
      <li id="note-80" ref="80" class="white g"></li>
      <li id="note-81" ref="81" class="black gs"></li>
      <li id="note-82" ref="82" class="white a"></li>
      <li id="note-83" ref="83" class="black as"></li>
      <li id="note-84" ref="84" class="white b"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Playing",
  props: {
    pianoDataBus: {
      type: Object,
      default() {
        return null;
      }
    }
  },
  components: {},
  data() {
    return {
      lastMidiNoteFromSignal: 0
    };
  },
  computed: {},
  methods: {
    handleKeyPress(note) {
      this.activateFromPress(note);
    },
    handleKeyRealease(note) {
      this.deActivateFromPress(note);
    },
    /**
     * Handle signals related to the reading and playing of midi files
     * @param {Object}  signal          Signal that will be interpreted
     * @param {Boolean} isMidiMessage   Indicator of whether the signal contains a midi message or
     *                                  a costum made signal (eg. "endOfFile")
     * @param {Object|String} payload   Content of the midi message if the signal is a midi message or
     *                                  string inficating type of signal if it is not a midi message
     */
    handleMidiFileSignal(signal) {
      // If the signal is a midi message named "Note on", we deactivate the note id the velocity
      // is 0 or we activate the note if the veolocity is different from 0.
      if (signal.isMidiMessage) {
        if (midiSignal.payload.name === "Note on") {
          if (midiSignal.payload.velocity === 0)
            this.activateFromSignal(midiSignal.payload.noteNumber);
          else this.deActivateFromSignal(midiSignal.payload.noteNumber);
        }
      } else {
        // A custom signal was implemented at to be emitted at the end of the last note
        // (Because the library used to play midi files does not emit a midi message for
        // the end of the last note and it is necessary know the end of the last note in
        // order to know when to deactivate the last note)
        if (midiSignal.payload === "EnfOfFile")
          this.deActivateFromSignal(this.lastMidiNoteFromSignal);
      }
    },
    activateFromPress(midiNumber) {
      // TODO: I AM HERE, ADD CLASS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      this.$refs[midiNumber]
      console.log(`Pressed : ${midiNumber}`);
    },
    deActivateFromPress(midiNumber) {
      console.log(`Released : ${midiNumber}`);
    },
    activateFromSignal(midiNumber) {
      this.lastMidiNoteFromSignal = midiNumber;
      console.log("Activate Note");
    },
    deActivateFromSignal(midiNumber) {
      console.log("Deactivate Note");
    }
  },
  beforeMount() {},
  mounted() {
    // If the component is connected to the piano bus, we add event listeners
    console.log(this.pianoDataBus);
    if (this.pianoDataBus !== null) {
      this.pianoDataBus.$on("pianoKeyPress", this.handleKeyPress);
      this.pianoDataBus.$on("pianoKeyRelease", this.handleKeyRealease);
      this.pianoDataBus.$on("midiFileSignal", this.handleMidiFileSignal);
    }
  },
  beforeDestroy() {
    // If the component is connected to the piano bus, we delete the event listeners
    if (this.pianoDataBus !== null) this.pianoDataBus.$off();
  },
  destroyed() {},
  watch: {}
};
</script>

<style scoped>
/* The CSS definition of this piano adapted from the open 
source project : https://codepen.io/zastrow/pen/oDBki */
#visual-piano {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
  width: 100%;
  max-width: 1000px;
  max-height: 350px;
}

ul {
  display: flex;
  justify-content: center;
  height: 97.5%;
  width: 100%;
  margin-bottom: 2.5%;
  padding: 5% 0 0 0;
  position: relative;
  border: 1px solid #160801;
  border-radius: 0.5em;
  background: linear-gradient(
      to bottom right,
      rgba(0, 0, 0, 0.3),
      rgba(0, 0, 0, 0)
    ),
    rgb(102, 44, 18);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) inset,
    0 1px rgba(212, 152, 125, 0.2) inset, 0 5px 15px rgba(0, 0, 0, 0.5);
}

li {
  margin: 0;
  padding: 0;
  list-style: none;
  position: relative;
  float: left;
}

ul .white {
  height: 103%;
  width: 6.76%;
  z-index: 1;
  border-left: 1px solid #bbb;
  border-bottom: 1px solid #bbb;
  border-radius: 0 0 5px 5px;
  box-shadow: -1px 0 0 rgba(255, 255, 255, 0.8) inset, 0 0 5px #ccc inset,
    0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #eee 0%, #fff 100%);
}

ul .white:active,
.triggered {
  border-top: 1px solid #777;
  border-left: 1px solid #999;
  border-bottom: 1px solid #999;
  box-shadow: 2px 0 3px rgba(0, 0, 0, 0.1) inset,
    -5px 5px 20px rgba(0, 0, 0, 0.2) inset, 0 0 3px rgba(0, 0, 0, 0.2);
  background: linear-gradient(to bottom, #fff 0%, #e9e9e9 100%);
}

.black,
.triggered {
  height: 60%;
  width: 4%;
  margin: 0 0 0 -2%;
  z-index: 2;
  border: 1px solid #000;
  border-radius: 0 0 3px 3px;
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -5px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 2px 4px rgba(0, 0, 0, 0.5);
  background: linear-gradient(45deg, #222 0%, #555 100%);
}

.black:active {
  box-shadow: -1px -1px 2px rgba(255, 255, 255, 0.2) inset,
    0 -2px 2px 3px rgba(0, 0, 0, 0.6) inset, 0 1px 2px rgba(0, 0, 0, 0.5);
  background: linear-gradient(to right, #444 0%, #222 100%);
}

.d,
.e,
.g,
.a,
.b {
  margin: 0 0 0 -2%;
}

ul li:first-child {
  border-radius: 5px 0 5px 5px;
}

ul li:last-child {
  border-radius: 0 5px 5px 5px;
}

ul .midi-file-triggered {
  border: 1px solid rgb(19, 117, 4);
  background: linear-gradient(
    to bottom,
    rgb(21, 255, 0) 0%,
    rgb(9, 139, 2) 100%
  );
}

ul .user-triggered {
  border: 1px solid rgb(4, 19, 117);
  background: linear-gradient(
    to bottom,
    rgb(0, 187, 255) 0%,
    rgb(2, 48, 139) 100%
  );
}
</style>
