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
    ...mapGetters(["urlStatic"]),
    ...mapState("account", ["user"]),
    ...mapGetters("experiment", [
      "experimentName",
      "pictureName", 
      "midiName", 
      "playingMode",
      "timeoutInSeconds"
    ]),
    ...mapGetters("piano", [
      "playedNotesMidi",
      "playedNotesDuration",
      "playedNotesTime",
      "playedNotesVelocity"
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
      const average = data => data.length > 0 ? data.reduce((sum, value) => sum + value) / data.length : 0;
      const standardDeviation = values => Math.sqrt(average(values.map(value => (value - average(values)) ** 2)));

      //logging
      let logObj = {
        header: {},
        data: {},
        evaluation: {}
      };

      logObj.header = {
        userId: this.user._id,
        username: this.user.username,
        experimentName: this.experimentName,
        experimentMode: this.playingMode,
        // TODO: INSURING THAT WE CAN GET THE NUMBER OF REPETITIONS
        // expBlockNum: this.experiment.currentBlockNum + 1, //so that block number starts from 0

        // TODO: INSURING THAT THE MIDIFILE FROM THE PREVIOUS BLOCK IS KEPT IF THERE IS NO NEW MIDI FILE
        // expMidiFileName: this.midiName,
      };

      logObj.data = {
        playedNotesMidi: this.playedNotesMidi,
        playedNotesDuration: this.playedNotesDuration,
        playedNotesTime: this.playedNotesTime,
        playedNotesVelocity: this.playedNotesVelocity
      };

      logObj.evaluation = this.$refs.playingMode.getMetricAndLog();

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
