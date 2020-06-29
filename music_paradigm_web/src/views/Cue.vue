<template>
  <div id="app">
    <!-- <img id='cue-img' :src="apiUrl+'/static/cue/'+startingNode+'.jpg'" onerror="console.log(this.src)"/> -->
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
      apiUrl: config.apiUrl,
    };
  },
  computed: {
    ...mapState("piano", ["player"]),
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", ["pictureName", "midiName"])
  },
  methods: {
    ...mapActions("piano", ["resetSongData", "loadMidiFile"]),
    ...mapActions("experiment", ["initState", "onNext"])
  },
  beforeMount() {
    this.initState();
  },
  mounted() {
    this.resetSongData();
    this.loadMidiFile(this.midiName);
    setTimeout(() => this.player.play(), 600);
    // MIDI file
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