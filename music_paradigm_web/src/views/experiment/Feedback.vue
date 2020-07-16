<template>
  <div id="feedback-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText"
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textContent }}</div>

    <div
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
    >
      <div class="feedback-grade-board">
        <div class="feedback-box" v-for="grade in grades" :key="grade.criteria">
          <feedback-grade :grade="grade" />
        </div>
      </div>
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
import { mapGetters } from "vuex";
import FeedbackGrade from "@/components/FeedbackGrade";

export default {
  name: "Feedback",
  components: {
    feedbackGrade: FeedbackGrade
  },
  props: {
    isSpaceBarPressed: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("piano", ["grades", "pressedKeys"]),
    ...mapGetters("experiment", [
      "hasText",
      "hasFootnote",
      "textContent",
      "anyPianoKey"
    ]),
    footnote() {
      if (this.anyPianoKey)
        return "Press any piano key or the space bar for going to the next step";
      else return "Press the space bar for going to the next step";
    },
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText) return "grid-small-area-big-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText) return "grid-small-area-big-area";
        else return "grid-single-area";
      }
    }
  },

  watch: {
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.$emit("stateEnded");
      }
    },
    pressedKeys(keys) {
      if (this.anyPianoKey && keys.length > 0) {
        this.$emit("stateEnded");
      }
    }
  }
};
</script>

<style scoped>
.feedback-grade-board {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.feedback-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2% 0;
  width: auto;
  height: 100%;
}
</style>
