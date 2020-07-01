<template>
  <div id="playingSpeed">
    <progress id="progress-bar" :value="timeProgress" :max="maxPlayProgress"></progress>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import performanceEvaluation from "@/_helpers/performanceEvaluation.js";

export default {
  name: "PlayingSpeed",
  components: {},
  data() {
    return {
      counterUniqueIdentifier: 0,
      timeProgress: 0,
      timeStep: 100
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["timeoutInSeconds"]),
    ...mapGetters("piano", [
      // From the midiFile (reference)
      "midiFileNotesMidi",
      // Eperimental results (to analyse)
      "playedNotesMidi",
      "playedNotesDuration"
    ]),

    // TODO: Decide whether Feedback is relevant here
    ...mapState(["feedbackStatus"]),

    playProgress() {
      return this.timeProgress;
    },
    maxPlayProgress() {
      return this.timeoutInSeconds * 1000;
    }
  },
  methods: {
    ...mapActions("results", ["create"]),
    countTime() {
      this.timeProgress += this.timeStep;
    },
    evaluate() {
      // TODO: Put this logic in a dedicated store
      const speedW = performanceEvaluation.getSpeedW(
        this.playedNotesMidi,
        this.midiFileNotesMidi
      );
      const { durations, speedD } = performanceEvaluation.getSpeedD(
        this.playedNotesMidi,
        this.midiFileNotesMidi,
        this.playedNotesDuration
      );
      const transitionSpeeds = performanceEvaluation.getTransitionSpeeds(
        this.playedNotesMidi,
        this.midiFileNotesMidi,
        this.playedNotesDuration
      );
      let meanTransitionSpeeds = [];
      if (transitionSpeeds.length != 0) {
        transitionSpeeds.forEach(element => {
          meanTransitionSpeeds.push(element.reduce((a, b) => a + b, 0));
        });
      }
      const accuracyW = performanceEvaluation.getAccuracyW(
        this.playedNotesMidi,
        this.midiFileNotesMidi
      );

      return {
        speedW: speedW,                           // corrects
        sequenceDurations: durations,             // array of ms
        speedD: speedD,                           // ms
        accuracyW: accuracyW,                     // incorrects
        transitionSpeeds: transitionSpeeds,       // array of array of ms
        transitionSpeedMean: meanTransitionSpeeds // array of ms
      };
    }
  },
  beforeMount() {},
  mounted() {
    this.counterUniqueIdentifier = window.setInterval(
      this.countTime,
      this.timeStep
    );
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  destroyed() {},
  watch: {
    playProgress(value) {
      // When the time is over we indicate the end of the playing state
      if (value >= this.maxPlayProgress) {
        this.$emit('finishedPlaying');
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
