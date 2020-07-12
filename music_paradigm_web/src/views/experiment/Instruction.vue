<template>
  <div id="instruction-state" class="experiment-state-container" :class="gridClass">
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
      <!-- <img id="instruction-img" :src="urlStatic(pictureName)" alt="Instruction" /> -->
      <visual-piano />
      <!-- <component :is="playingMode" v-on:finishedPlaying="goNextStep" ref="playingMode" /> -->
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
import { mapState, mapActions, mapGetters } from "vuex";
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
    return {
      false: false
    };
  },
  computed: {
    ...mapState("piano", ["pressedKeys"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
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
        return "Any piano key or the space bar for going to the next step";
      else return "Press the space bar for going to the next step";
    }
  },
  methods: {
    ...mapActions("experiment", ["goNextStep"])
  },
  watch: {
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.$emit("stateEnded");
      }
    },
    // pressedKeys(keys) {
    //   if (this.anyPianoKey && keys.length > 0) {
    //     this.$emit("stateEnded");
    //   }
    // }
  },
  beforeMount() {},
  mounted() {}
};
</script>

<style scoped>
</style>
