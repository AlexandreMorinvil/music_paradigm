<template>
  <div id="playingSpeed">
    <progress id="progress-bar" :value="timeProgress" :max="maxPlayProgress"></progress>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import config from "@/config";
import performanceEvaluation from "@/_helpers/performanceEvaluation.js";

export default {
  name: "PlayingSpeed",
  components: {},
  data() {
    return {
      counterUniqueIdentifier: 0,
      timeProgress: 0,
      timeSteps: 100
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "midiName", 
      "timeoutInSeconds"
    ]),

    ...mapState("account", ["user"]),
    ...mapState("piano", [
      "songNotes",
      "songDurations",
      "playedNotes",
      "playedDurations",
      "playedOffsets",
      "playedVelocities"
    ]),

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
    ...mapActions("account", { updateUser: "update" }),
    ...mapActions("experiment", ["initState"]),
    countTime() {
      this.timeProgress += this.timeSteps;
    },
    getMetricAndLog() {
          const speedW = performanceEvaluation.getSpeedW(this.playedNotes, this.songNotes);
          const { durations, speedD } = performanceEvaluation.getSpeedD(this.playedNotes, this.songNotes, this.playedDurations);
          const transitionSpeeds = performanceEvaluation.getTransitionSpeeds(this.playedNotes, this.songNotes, this.playedDurations);
          let meanTransitionSpeeds = [];
          if (transitionSpeeds.length != 0) {
            transitionSpeeds.forEach(element => {
              meanTransitionSpeeds.push(element.reduce((a, b) => a + b, 0));
            });
          }
          const accuracyW = performanceEvaluation.getAccuracyW(this.playedNotes, this.songNotes);

          Object.assign(logObj, {
            speedW: speedW, //corrects
            sequenceDurations: durations, // array of ms
            speedD: speedD, //ms
            accuracyW: accuracyW, //incorrects
            transitionSpeeds: transitionSpeeds, //array of array of ms
            transitionSpeedMean: meanTransitionSpeeds //array of ms
          });

      console.log(logObj);
      // send results
      this.create(logObj);
    }
  },
  beforeMount() {},
  mounted() {
      this.counterUniqueIdentifier = window.setInterval(this.countTime, this.timeSteps);
  },
  beforeDestroy() {
      window.clearInterval(this.counterUniqueIdentifier);
  },
  destroyed() {},
  watch: {
    // playProgress(val) {
    //     if (val >= 100) {
    //         this.feedbackStatus = "ss";
    //     }
    // }
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
