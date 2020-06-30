<template>
  <div id="app">
    <img id="playing-img" :src="urlStatic(pictureName)" alt="Playing" onerror="this.hidden=true" />
    <component :is="playingMode" v-on:finished="onNext" ref="playingMode"/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import config from "@/config";
import performanceEvaluation from "@/_helpers/performanceEvaluation.js";
import PlayingSpeedComponent from "@/components/PlayingSpeed";
import PlayingRhythmComponent from "@/components/PlayingRhythm";

export default {
  name: "Playing",
  components: {
    speed: PlayingSpeedComponent,
    rhythm: PlayingRhythmComponent
  },
  data() {
    return {
      mainTimeOut: null,
      isFinished: false
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
    ...mapActions("piano", ["resetPlayedNotesLogs"]),
    ...mapActions("experiment", ["initState", "onNext"]),
    getMetricAndLog() {
      //logging
      let logObj = {
        header: {},
        playedNotes: {},
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

      logObj.playedNotes = {
        midi: this.playedNotesMidi,
        duration: this.playedNotesDuration,
        time: this.playedNotesTime,
        velocity: this.playedNotesVelocity
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
    // TODO: take that out if not necessary
    //this.feedbackStatus = "ww";

    this.resetPlayedNotesLogs();


    if (this.timeoutInSeconds !== 0) {
      this.mainTimeOut = window.setTimeout(() => {
        this.onNext();
      }, this.timeoutInSeconds * 10000);
    }

  },
  beforeDestroy() {
    this.getMetricAndLog();
  },
  destroyed() {
    window.clearTimeout(this.mainTimeOut);
  },
  watch: {}
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
