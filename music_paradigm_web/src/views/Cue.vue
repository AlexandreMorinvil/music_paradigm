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
    ...mapActions("piano", ["setSongNotes", "setSongDurations"]),
    ...mapActions("experiment", ["initState", "onNext"])
  },
  beforeMount() {
    this.initState();
  },
  mounted() {
    this.setSongNotes([]);
    this.setSongDurations([]);

    // TODO: Put this piece of logic in the piano component
    // online MIDI file loader
    const xhr = new XMLHttpRequest();
    let fileUrl = fileUrl = this.urlStatic(this.midiName);
    // console.log(fileUrl);
    xhr.open("GET", fileUrl, true);
    xhr.overrideMimeType("text/plain; charset=x-user-defined");
    xhr.responseType = "arraybuffer";
    xhr.send();
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        this.player.loadArrayBuffer(xhr.response);
        // console.log(this.player.events[0].length); //0-9:init till MIDI port, last:end, middle:noteon+noteoff pair
        // console.log(this.player.events[0]);
        setTimeout(() => this.player.play(), 600);
        // } else {
        //   console.error('XHR failed');
      }
    };

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