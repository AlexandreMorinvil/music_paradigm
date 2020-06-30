<template>
  <div id="playingRythm">
    <progress id="progress-bar" :value="timeProgress" :max="maxPlayProgress"></progress>
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
      customStyle: "",

      current: {},
      mainTimeOut: null
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "timeoutInSeconds"
    ]),

    ...mapState("account", ["user"]),
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
      return playedNotesMidi.length;
    },
    maxPlayProgress() {
      return this.midiFileNotesMidi.length;
    }
  },
  methods: {
    ...mapActions("results", ["create"]),
    ...mapActions("experiment", ["initState"]),
    ...mapActions("experiment", { expOnNext: "onNext" }),
    onNext() {
      this.expOnNext();
      this.getMetricAndLog();
    },
    getMetricAndLog() {

      const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

      const pitchAcc = performanceEvaluation.getAccuracyB_2(this.playedNotesMidi, this.midiFileNotesMidi);
      const rhythmDiff = performanceEvaluation.getRhythmTempo(this.playedNotesDuration, this.midiFileNotesDuration);
      console.log(rhythmDiff);
      // const rhythmDiff = performanceEvaluation.getRhythm(this.playedNotesDuration, this.midiFileNotesDuration);
      
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

      console.log(logObj);
      // send results
      this.create(logObj);
    }
  },
  beforeMount() {},
  mounted() {
    //this.feedbackStatus = "ww";

    // TODO : Erase that piece of code or move to piano
    // this.experiment.finished = false;

    if (this.timeoutInSeconds !== 0) {
      this.mainTimeOut = window.setTimeout(() => {
        this.onNext();
      }, (this.timeoutInSeconds || 10) * 1000);
    }
  },
  destroyed() {
    window.clearTimeout(this.mainTimeOut);
  },
  watch: {
    // TODO: Integrate the stateFInished in here when it's here
    playProgress(val) {
      if (val >= 100) {
        window.clearTimeout(this.mainTimeOut);
        // TODO : Erase that piece of code or move to piano
        // this.experiment.finished = true;
        window.setTimeout(() => {
          this.onNext();
          // TODO : Erase that piece of code or move to piano
          // this.experiment.finished = false;
        }, 500);
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
