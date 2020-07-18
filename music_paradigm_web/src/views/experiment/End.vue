<template>
  <div id="end-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText || hasNoContent"
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textToDisplay }}</div>

    <div
      v-if="hasVisualMedia"
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
    >
      <img id="end-img" :src="urlStatic(pictureName)" alt="Instruction" />
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

export default {
  name: "End",
  components: {},
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
    ...mapGetters(["urlStatic"]),
    ...mapGetters("piano", ["pressedKeys"]),
    ...mapGetters("experiment", [
      "hasNoContent",
      "hasText",
      "hasVisualMedia",
      "hasFootnote",
      "pictureName",
      "textContent",
      "anyPianoKey"
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
    textToDisplay() {
      if (this.textContent !== "") return "End";
      else return this.textContent;
    },
    footnote() {
      if (this.anyPianoKey)
        return "Press any piano key or the space bar for ending the experiment";
      else return "Press the space bar for ending the experiment";
    },
    textToDisplay() {
      if (this.hasNoContent) return "End";
      else return this.textContent;
    }
  },
  methods: {},
  mounted() {},
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
</style>
