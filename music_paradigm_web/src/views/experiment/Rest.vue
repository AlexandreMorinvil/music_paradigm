<template>
  <div id="rest-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText"
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textContent }}</div>

    <div
      v-if="hasVisualMedia"
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
    >
      <visual-piano v-if="hasInteractivePiano" />
      <img id="cue-img" v-else :src="urlStatic(pictureName)" alt="Rest" />
    </div>

    <div
      id="note-area"
      v-if="hasFootnote"
      class="experiment-state-division state-division-text"
    >{{ footnote }}</div>
  </div>
</template>

<script>
import "@/styles/experimentState.css";
import { mapActions, mapGetters } from "vuex";
import VisualPiano from "@/components/VisualPiano.vue";

export default {
  name: "Rest",
  components: {
    visualPiano: VisualPiano
  },
  data() {
    return {
      defaultTimeLimitInSeconds: 15, // Default time limit if no time is specified in the experiment
      counterUniqueIdentifier: 0, // Unique Identifier of the countdown used for clean up
      timeLeftInMilliseconds: 0, // Time left to the countdown
      timeStepInMilliseconds: 500 // Timesteps of the countdown in miliseconds
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["pictureName", "timeoutInSeconds"]),
    ...mapGetters("experiment", [
      "hasInteractivePiano",
      "hasText",
      "hasVisualMedia",
      "hasFootnote",
      "textContent",
      "pictureName",
      "timeoutInSeconds"
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText && this.hasVisualMedia) return "grid-area-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText && this.hasVisualMedia) return "grid-area-area";
        else return "grid-single-area";
      }
    },
    footnote() {
      return `The experiment will go to the next step in ${this.timeLeftDisplay}`;
    },
    timeLimitInMiliseconds() {
      return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
    },
    timeLeftDisplay() {
      var display = "";
      const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
      const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
      if (minutes > 0) {
        display += `${minutes} minutes `;
      }
      display += `${seconds} seconds`
      return display;
    }
  },
  methods: {
    startCountdown() {
      this.timeLeftInMilliseconds = this.timeLimitInSeconds * 1000;
      this.referenceTime = Date.parse(new Date());
      this.counterUniqueIdentifier = window.setInterval(
        this.countdown,
        this.timeStepInMilliseconds
      );
    },
    countdown() {
      this.timeLeftInMilliseconds = Math.max(
        this.timeLimitInMiliseconds - (Date.now() - this.referenceTime),
        0
      );
    }
  },
  mounted() {
    // Starting the countdown of the maximum time for the rest
    this.startCountdown();
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  watch: {
    timeLeftInMilliseconds(value) {
      // When the time is over we indicate the end of the playing state
      if (value <= 0) {
        this.$emit("stateEnded");
      }
    }
  }
};
</script>

<style scoped>
</style>
