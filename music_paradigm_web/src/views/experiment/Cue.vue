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
      <visual-piano v-if="hasInteractivePiano" />
      <img id="instruction-img" v-else :src="urlStatic(pictureName)" alt="Cue" />
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
  name: "Cue",
  components: {
    visualPiano: VisualPiano
  },
  data() {
    return {
      errorAutomaticTransitionSeconds: 10
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("piano", ["isMidiFileLoaded"]),
    ...mapGetters("experiment", [
      "midiName",
      "hasInteractivePiano",
      "hasText",
      "hasVisualMedia",
      "hasFootnote",
      "pictureName",
      "textContent"
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText && this.hasVisualMedia)
          return "grid-area-big-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText && this.hasVisualMedia) return "grid-area-big-area";
        else return "grid-single-area";
      }
    },
    footnote() {
      var noteMessage;
      if (this.midiName !== "")
        noteMessage = `The experiment will automatically go to the next step after the muscial cue`;
      else
        noteMessage = `There is no melody to be played, the next step will proceed in ${this.errorAutomaticTransitionSeconds} seconds`;
      return noteMessage;
    }
  },
  methods: {
    ...mapActions("piano", [
      "playMidiFile",
      "addPlayerEndOfFileAction",
      "removePlayerEndOfFileAction"
    ]),
    handleEndOfMidiFile() {
      this.$emit("stateEnded");
    }
  },
  beforeMount() {},
  mounted() {
    this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
  },
  beforeDestroy() {
    this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
  },
  watch: {
    isMidiFileLoaded: {
      immediate: true,
      handler: function(isReady) {
        if (isReady) setTimeout(() => this.playMidiFile(), 500);
        else if (this.midiName === "")
          setTimeout(
            () => this.$emit("stateEnded"),
            this.errorAutomaticTransitionSeconds * 1000
          );
      }
    }
  }
};
</script>

<style scoped>
</style>