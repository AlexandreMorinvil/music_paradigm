<template>
  <div id="app">
    <img id="playing-img" :src="urlStatic(pictureName)" alt="Playing" onerror="this.hidden=true" />
    <component :is="playingMode"  ref="playingMode"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import config from "@/config";
import performanceEvaluation from "@/_helpers/performanceEvaluation.js";
import SpeedPlayingComponent from "./PlayingSpeed";
import RythmPlayingComponent from "./PlayingRythm";

export default {
  name: "Playing",
  components: {
    speed: SpeedPlayingComponent,
    rythm: RythmPlayingComponent
  },
  data() {
    return {
      mainTimeOut: null
    };
  },
  computed: {
    // ERASE THAT
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "experimentName",
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

    playProgress() {}
  },
  methods: {
    ...mapActions("results", ["create"]),
    ...mapActions("account", { updateUser: "update" }),
    ...mapActions("piano", ["resetPlayedNotesLogs"]),
    ...mapActions("experiment", ["initState", "onNext"]),
    getMetricAndLog() {
      console.log(this.playedNotes, 'played');
      console.log(this.songNotes);
      // console.log(this.playedDurations, this.songDurations);
      const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

      //logging
      const logObj = {
        userId: this.user._id,
        username: this.user.username,
        experimentName: this.experimentName,
        experimentMode: this.playingMode,
        // TODO: INSURING THAT WE CAN GET THE NUMBER OF REPETITIONS
        // expBlockNum: this.experiment.currentBlockNum + 1, //so that block number starts from 0

        // TODO: INSURING THAT THE MIDIFILE FROM THE PREVIOUS BLOCK IS KEPT IF THERE IS NO NEW MIDI FILE
        // expMidiFileName: this.midiName,

        playedNotes: this.playedNotes,
        playedOnsets: this.playedDurations,
        playedOffsets: this.playedOffsets,
        playedVelocities: this.playedVelocities
      };

      this.$refs.playingMode.getMetricAndLog();

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

    this.resetPlayedNotesLogs();

    // TODO : Erase that piece of code or move to piano
    // this.experiment.finished = false;

    if (this.timeoutInSeconds !== 0) {
      this.mainTimeOut = window.setTimeout(() => {
        this.onNext();
      }, this.timeoutInSeconds * 1000);
    }

  },
  beforeDestroy() {
    this.getMetricAndLog();
  },
  destroyed() {
    window.clearTimeout(this.mainTimeOut);
  },
  watch: {
    playProgress(val) {}
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
