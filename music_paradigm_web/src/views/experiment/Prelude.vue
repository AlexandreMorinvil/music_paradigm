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

export default {
  name: "Prelude",
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
    ...mapGetters("piano", ["pressedKeys"]),
    footnote() {
      return "The experiment will start once the internal ressources are ready";
    },
    textToDisplay() {
      return "Loading...";
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
