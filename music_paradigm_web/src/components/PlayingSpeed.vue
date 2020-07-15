<template>
  <div id="playing-speed-area" class="playing-area">
    <div id="playing-visual-media" class="playing-visual-media-area">
      <visual-piano v-if="hasInteractivePiano" />
      <img id="playing-img" v-else :src="urlStatic(pictureName)" alt="Playing" />
    </div>

    <div id="playing-progress-bar" class="playing-progress-bar-area">
      <progress id="progress-bar" :value="timeProgress" :max="maxPlayProgress"></progress>
    </div>
  </div>
</template>

<script>
import "@/styles/playingTemplate.css";
import { mapActions, mapGetters } from "vuex";
import VisualPiano from "@/components/VisualPiano.vue";

export default {
  name: "PlayingSpeed",
  components: {
    visualPiano: VisualPiano
  },
  data() {
    return {
      defaultTimeLimitInSeconds: 30,
      counterUniqueIdentifier: 0,
      referenceTime: 0,
      timeProgress: 0,
      timeStepInMilliseconds: 100
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "hasInteractivePiano",
      "pictureName",
      "timeoutInSeconds"
    ]),
    ...mapGetters("piano", ["midiFileNotesMidi", "playedNotesMidi"]),
    timeLimit() {
      return this.timeoutInSeconds || this.defaultTimeLimitInSeconds;
    },
    playProgress() {
      return this.timeProgress;
    },
    maxPlayProgress() {
      return this.timeLimit * 1000;
    }
  },
  methods: {
    ...mapActions("piano", ["evaluateSpeedType"]),
    startTimeLimit() {
      this.referenceTime = Date.parse(new Date());
      this.counterUniqueIdentifier = window.setInterval(
        this.countUp,
        this.timeStepInMilliseconds
      );
    },
    countUp() {
      this.timeProgress = Date.now() - this.referenceTime;
    },
    updateFootnote() {
      var noteMessage =
        "The experiment will go to the next step after the time allowed";
      this.$emit("footnote", noteMessage);
    },
    evaluate() {
      this.evaluateSpeedType();
    }
  },
  beforeMount() {},
  mounted() {
    this.updateFootnote();
    this.startTimeLimit();
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  watch: {
    playProgress(value) {
      // When the time is over we indicate the end of the playing state
      if (value >= this.maxPlayProgress) {
        this.$emit("finishedPlaying");
      }
    }
  }
};
</script>

<style scoped>
</style>
