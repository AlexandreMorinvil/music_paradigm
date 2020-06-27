<template>
  <div id="app">
    <img id="playing-img" :src="urlStatic(pictureName)" alt="Playing" onerror="this.hidden=true" />
    <progress id="progress-bar" :value="playProgress" max="100" :style="customStyle"></progress>
    <!-- <meter id="progress-bar" :value="playProgress" max="100" style="width:500px"></meter> -->
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
      "pictureName", 
      "midiName", 
      "playingMode",
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
      if (this.songNotes.length === 0) return 100;

      // let tempProgress = this.playedNotes.length / this.songNotes.length;
      // tempProgress = Number.isInteger(tempProgress) && tempProgress !== 0? 1: tempProgress - Math.floor(tempProgress);
      // return tempProgress * 100;

      let tempProgress = 0;
      switch (this.playingMode) {
        case "speed":
          tempProgress = this.playedNotes.length / (this.songNotes.length * 50);
          // tempProgress = 100;
          // this.customStyle=`width:${this.playedNotes.length * 10}px`;
          // console.log(this.customStyle);
          break;

        case "rhythm":
          tempProgress = this.playedNotes.length / this.songNotes.length;
          break;
      }
      return tempProgress * 100;
    }
  },
  methods: {
    ...mapActions("results", ["create"]),
    ...mapActions("account", { updateUser: "update" }),
    ...mapActions("experiment", ["initState"]),
    ...mapActions("experiment", { expOnNext: "onNext" }),
    onNext() {
      this.expOnNext();
      this.getMetricAndLog();
    },
    getMetricAndLog() {
      // console.log(this.playedNotes, 'played');
      // console.log(this.songNotes);
      // console.log(this.playedDurations, this.songDurations);
      const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

      //logging
      const logObj = {
        userId: this.user._id,
        username: this.user.username,
        experimentMode: this.playingMode,
        experimentFolder: this.experiment.folder,
        expBlockNum: this.experiment.currentBlockNum + 1, //so that block number starts from 0
        expMidiFileName: this.experiment.currentMidi ? this.experiment.currentMidi : "",

        playedNotes: this.playedNotes,
        playedOnsets: this.playedDurations,
        playedOffsets: this.playedOffsets,
        playedVelocities: this.playedVelocities
      };

      switch (this.playingMode) {
        case "speed": {
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

          break;
        }
        case "rhythm": {
          const pitchAcc = performanceEvaluation.getAccuracyB_2(this.playedNotes, this.songNotes);
          const rhythmDiff = performanceEvaluation.getRhythmTempo(this.playedDurations, this.songDurations);
          console.log(rhythmDiff);
          // const rhythmDiff = performanceEvaluation.getRhythm(this.playedDurations, this.songDurations);
          this.feedbackStatus = pitchAcc === 100 ? "s" : "w";
          this.feedbackStatus += rhythmDiff <= config.maxRhythmError ? "s" : "w";

          const pitchErrorNum = performanceEvaluation.getAccuracyD_2(this.playedNotes, this.songNotes);
          const missedNotes = performanceEvaluation.getMissedNotes(this.playedNotes, this.songNotes);
          let missedNoteNum = missedNotes.length;
          const IOIs = performanceEvaluation.getIOIs(this.playedDurations, this.songDurations);
          const sequenceDuration = missedNoteNum ? 0 : this.playedDurations[this.playedDurations.length - 1] - this.playedDurations[0];
          const meanIOI = average(IOIs);
          const sdIOI = standardDeviation(IOIs);
          const cvIOI = sdIOI / meanIOI;

          Object.assign(logObj, {
            pitchErrorNum: pitchErrorNum, //errors
            missedNotes: missedNotes, //array of number
            missedNoteNum: missedNoteNum, //notes
            IOIs: IOIs, //array of ms
            IOImean: meanIOI, //ms
            IOIsd: sdIOI,
            IOIcv: cvIOI,
            sequenceDuration: sequenceDuration, //ms
            above50sFlag: sequenceDuration > 50000,
            pitchAcc: pitchAcc, //%
            rhythmDiff: rhythmDiff //proportion
          });
          break;
        }
      }

      console.log(logObj);
      // send results
      this.create(logObj);
    }
  },
  beforeMount() {
    this.initState();
  },
  mounted() {
    //this.feedbackStatus = "ww";

    // TODO : Erase that piece of code or move to piano
    // this.experiment.finished = false;

    if (this.timeoutInSeconds !== 0) {
      this.mainTimeOut = window.setTimeout(() => {
        this.onNext();
      }, this.timeoutInSeconds * 1000);
    }

  },
  destroyed() {
    window.clearTimeout(this.mainTimeOut);
  },
  watch: {
    playProgress(val) {
      switch (this.playingMode) {
        case "speed":
          if (val >= 100) {
            this.feedbackStatus = "ss";
          }
          break;

        case "rhythm":
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
          break;
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
