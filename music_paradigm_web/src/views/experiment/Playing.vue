<template>
  <div id="playing-state" class="experiment-state-container" :class="gridClass">
    <div
      v-if="hasText"
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textContent }}</div>

    <div id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <component
        :is="playingMode"
        v-on:footnote="handleFootnote"
        v-on:finishedPlaying="handdleEndOfPlaying"
        ref="playingMode"
      />
    </div>

    <div
      id="note-area"
      v-if="hasFootnote"
      class="experiment-state-division state-division-text"
    >{{ footnote }}</div>
  </div>
</template>

<script>
import "@/styles/experimentStateTemplate.css";
import { mapGetters } from "vuex";

import PlayingSpeedComponent from  "./PlayingSpeed";
import PlayingRhythmComponent from "./PlayingRhythm";

export default {
  name: "Playing",
  components: {
    speed: PlayingSpeedComponent,
    rhythm: PlayingRhythmComponent
  },
  data() {
    return {
      footnote: "The experiment will go to the next step after your performance"
    };
  },
  computed: {
    ...mapGetters("experiment", [
      "hasText",
      "hasFootnote",
      "textContent",
      "playingMode"
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText)
          return "grid-small-area-big-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText)
          return "grid-small-area-big-area";
        else return "grid-single-area";
      }
    }
  },
  methods: {
    handleFootnote(footNote) {
      this.footnote = footNote;
    },
    handdleEndOfPlaying() {
      this.evaluatePlayedNotes();
      this.$emit("stateEnded");
    },
    evaluatePlayedNotes() {
      this.$refs.playingMode.evaluate();
    }
  }
};
</script>

<style scoped>
</style>
