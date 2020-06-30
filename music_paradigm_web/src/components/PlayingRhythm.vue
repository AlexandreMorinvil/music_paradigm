<template>
  <div id="playingRythm">
    <progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import config from "@/config";
import performanceEvaluation from "@/_helpers/performanceEvaluation.js";

export default {
  name: "Playing",
  components: {},
  data() {
    return {
      maxTimeTimeout: null
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["timeoutInSeconds"]),
    ...mapGetters("piano", [
      // From the midiFile (reference)
      "midiFileNotesMidi",
      "midiFileNotesDuration",
      // Eperimental results (to analyse)
      "playedNotesMidi",
      "playedNotesDuration"
    ]),
    ...mapState(["feedbackStatus"]),
    playProgress() {
      return this.playedNotesMidi.length;
    },
    maxPlayProgress() {
      return this.midiFileNotesMidi.length;
    },
    lastNoteDuration() {
      return this.midiFileNotesDuration[this.midiFileNotesDuration.length - 1]
    }
  },
  methods: {
    getMetricAndLog() {

      const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

      const pitchAcc = performanceEvaluation.getAccuracyB_2(this.playedNotesMidi, this.midiFileNotesMidi);
      const rhythmDiff = performanceEvaluation.getRhythmTempo(this.playedNotesDuration, this.midiFileNotesDuration);
      console.log(rhythmDiff);

      // TODO: See if there is a way to solve this function which Weiwei couldn't implement
      // const rhythmDiff = performanceEvaluation.getRhythm(this.playedNotesDuration, this.midiFileNotesDuration);
      
      // TODO: See if this piece of logic concerning the feedback belongs to here
      this.feedbackStatus = pitchAcc === 100 ? "s" : "w";
      this.feedbackStatus += rhythmDiff <= config.maxRhythmError ? "s" : "w";

      const pitchErrorNum = performanceEvaluation.getAccuracyD_2(this.playedNotesMidi, this.midiFileNotesMidi);
      const missedNotes = performanceEvaluation.getMissedNotes(this.playedNotesMidi, this.midiFileNotesMidi);
      const missedNoteNum = missedNotes.length;
      const IOIs = performanceEvaluation.getIOIs(this.playedNotesDuration, this.midiFileNotesDuration);
      const sequenceDuration = missedNoteNum ? 0 : this.playedNotesDuration[this.playedNotesDuration.length - 1] - this.playedNotesDuration[0];
      const meanIOI = average(IOIs);
      const sdIOI = standardDeviation(IOIs);
      const cvIOI = sdIOI / meanIOI;

      return {
        pitchErrorNum: pitchErrorNum,           // errors
        missedNotes: missedNotes,               // array of number
        missedNoteNum: missedNoteNum,           // notes
        IOIs: IOIs,                             // array of ms
        IOImean: meanIOI,                       // ms
        IOIsd: sdIOI,
        IOIcv: cvIOI,
        sequenceDuration: sequenceDuration,     // ms
        above50sFlag: sequenceDuration > 50000,
        pitchAcc: pitchAcc,                     // %
        rhythmDiff: rhythmDiff                  // proportion
      };
    }
  },
  beforeMount() {},
  mounted() {
    // Set the maximum time limit
    if (this.timeoutInSeconds !== 0) {
      this.maxTimeTimeout = window.setTimeout(() => {
        this.$emit('finished');
      }, this.timeoutInSeconds * 1000);
    }
  },
  destroyed() {
    window.clearTimeout(this.maxTimeTimeout);
  },
  watch: {
    playProgress(value) {
      // When the last note was pressed, we wait the duration of the last note
      // plus one additional second before indicating the end of the playing state
      if (value >= this.maxPlayProgress) {
        setTimeout(() => {
          this.$emit('finished');
        }, (this.lastNoteDuration + 1) * 1000);
      }
    }
  }
};
</script>

<style scoped>
#app {
  text-align: center;
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* progress {
  -webkit-appearance: none;
} */

* {
  font-size: 1.6rem;
}
</style>
