<template>
  <div id="prelude-state" class="experiment-state-container grid-area-note">
    <div
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textToDisplay }}</div>

    <div
      id="note-area"
      class="experiment-state-division state-division-text"
    >{{ footnote }}</div>
  </div>
</template>

<script>
import "@/styles/experimentStateTemplate.css";
import { mapGetters } from "vuex";
import VisualPiano from "@/components/VisualPiano.vue";

export default {
  name: "Instruction",
  components: {
    visualPiano: VisualPiano
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
    ...mapGetters(["urlExperimentRessource"]),
    ...mapGetters("piano", ["pressedKeys"]),
    footnote() {
      return "Press the space bar for going to the next step";
    },
    textToDisplay() {
      if (this.hasNoContent) return "Instruction";
      else return this.textContent;
    }
  },
  watch: {
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.$emit("experimentReady");
      }
    }
  }
};
</script>

<style scoped>
</style>
