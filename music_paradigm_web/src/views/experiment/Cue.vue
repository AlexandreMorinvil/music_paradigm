<template>
  <div id="cue-state" class="experiment-state-container">
    <img id="instruction-img" :src="urlStatic(pictureName)" alt="Cue" />
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: "Cue",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState("piano", ["player"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["pictureName", "midiName"])
  },
  methods: {
    ...mapActions("piano", ["loadMidiFile", "playMidiFile"]),
    ...mapActions("experiment", ["goNextStep"])
  },
  beforeMount() {},
  mounted() {
    // Loading a new midi file and playing the midi file content
    this.loadMidiFile(this.midiName).then(() => {
      setTimeout(() => this.playMidiFile(), 500);
    });

    // Going to the next step after the playback ends
    this.player.on("endOfFile", () => {
      this.goNextStep();
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