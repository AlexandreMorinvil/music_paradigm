<template>
  <div id="instruction-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText || hasNoContent"
      id="text-area"
      class="experiment-state-division state-division-text"
    > <p>{{ textContent }}</p>
    <!-- Default display if no content is provided -->
    <p v-if="hasNoContent"> Instruction </p>
 </div>

    <div
      v-if="hasVisualMedia"
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
    >
      <visual-piano v-if="hasInteractivePiano" />
      <img id="instruction-img" v-else :src="urlStatic(pictureName)" alt="Instruction" />
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
    ...mapGetters(["urlStatic"]),
    ...mapGetters("piano", ["pressedKeys"]),
    ...mapGetters("experiment", [
      "hasNoContent",
      "hasInteractivePiano",
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
    footnote() {
      if (this.anyPianoKey)
        return "Press any piano key or the space bar for going to the next step";
      else return "Press the space bar for going to the next step";
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
</style>
