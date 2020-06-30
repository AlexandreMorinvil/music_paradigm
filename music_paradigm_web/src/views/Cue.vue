<template>
  <div id="app">
    <img id="instruction-img" :src="urlStatic(pictureName)" alt="Cue" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

import config from "@/config";

export default {
  name: "Cue",
  components: {},
  data() {
    return {
    };
  },
  computed: {
    ...mapState("piano", ["player"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["pictureName", "midiName"])
  },
  methods: {
    ...mapActions("piano", [
      "resetMidiFileData",
      "loadMidiFile",
      "playMidiFile"
    ]),
    ...mapActions("experiment", ["initState", "onNext"])
  },
  beforeMount() {
    this.initState();
  },
  mounted() {
    // Loading a new midi file
    this.resetMidiFileData();
    this.loadMidiFile(this.midiName).then(() => {
      // Paying the midi file content
      setTimeout(() => this.playMidiFile(), 500);
    });

    // Going to the next step after the playback ends
    this.player.on("endOfFile", () => {
      this.onNext();
      this.player.eventListeners["endOfFile"] = [];
    });
  }
};
</script>

<style scoped>
img {
  max-height: 100%;
  width: auto;
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>