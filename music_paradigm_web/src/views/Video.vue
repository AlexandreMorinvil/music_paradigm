<template>
  <div id="app">
    <video-player :options="videoOptions" :url="url" :playBack="playBack" />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import config from "@/config";
import VideoComponentVue from "../components/TheVideoPlayer.vue";
export default {
  name: "Video",
  components: {
    VideoPlayer: VideoComponentVue
  },
  data() {
    return {
      apiUrl: config.apiUrl,
      pictureName: "",
      videoName: "",
      videoOptions: {},
      playBack: {
        delay: 5,
        startTime: 1.9,
        endTime: 5
      }
    };
  },
  computed: {
    ...mapState(["player"]),
    ...mapState("experiment", ["experiment"]),
    url() {
      return {
        src: this.apiUrl + "/static/" + this.experiment.videoName,
        poster: this.apiUrl + "/static/" + "assets/images/Music_poster.bmp"
      };
    }
  },
  methods: {
    ...mapActions("experiment", ["initState", "onNext"]),
    ...mapActions(["setSongNotes", "setSongDurations"])
  },
  beforeMount() {
    this.initState();
 },
  mounted() {
    this.setSongNotes([]);
    this.setSongDurations([]);
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