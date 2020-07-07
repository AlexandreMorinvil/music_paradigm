<template>
  <div id="playingRythm">
    <progress id="progress-bar" :value="playProgress" :max="maxPlayProgress"></progress>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
      "midiFileNotesMidi",
      "midiFileNotesDuration",
      "playedNotesMidi"
    ]),
    playProgress() {
      return this.playedNotesMidi.length;
    },
    maxPlayProgress() {
      return this.midiFileNotesMidi.length;
    },
    lastNoteDuration() {
      return this.midiFileNotesDuration[this.midiFileNotesDuration.length - 1];
    }
  },
  methods: {
    ...mapActions("piano", ["evaluateRhythmType"]),
    evaluate() {
      this.evaluateRhythmType();
    }
  },
  beforeMount() {},
  mounted() {
    // Set the maximum time limit
    if (this.timeoutInSeconds !== 0) {
      this.maxTimeTimeout = window.setTimeout(() => {
        this.$emit("finishedPlaying");
      }, this.timeoutInSeconds * 1000);
    }
  },
  destroyed() {
    window.clearTimeout(this.maxTimeTimeout);
  },
  watch: {
    playProgress(value) {
      // When the last note was pressed, we wait the duration of the last note
      // plus a second before indicating the end of the playing state
      if (value >= this.maxPlayProgress) {
        this.timerUniqueIdentifier = setTimeout(() => {
          this.$emit("finishedPlaying");
          console.log("The signal was emitted")
        }, (this.lastNoteDuration + 1000));
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
