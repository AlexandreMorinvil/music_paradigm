<template>
  <div id="video-state" class="experiment-state-container grid-area-area-note" :class="gridClass">
    <div
      style="background-color: blue;"
      v-if="hasText"
      id="text-area"
      class="experiment-state-division state-division-text"
    >{{ textContent }}</div>

    <div
      style="background-color: purple;"
      id="visual-media-area"
      class="experiment-state-division state-division-visual-media"
    >
      <div class="visual-media-board">
        <div class="video-box">
          <video-player
            :src="urlStatic(videoName)"
            :dimension="videoDimensions"
            :playBack="playBack"
          />
        </div>
        <div class="piano-box" v-if="hasInteractivePiano" :style="videoWidth">
          <visual-piano />
        </div>
      </div>
    </div>
    <div
      style="background-color: green;"
      id="note-area"
      v-if="hasFootnote"
      class="experiment-state-division state-division-text"
    >{{ footnote }}</div>
  </div>
</template>

<script>
import "@/styles/experimentState.css";
import { mapGetters } from "vuex";
import VideoPlayer from "@/components/VideoPlayer.vue";
import VisualPiano from "@/components/VisualPiano.vue";

export default {
  name: "Video",
  components: {
    visualPiano: VisualPiano,
    VideoPlayer: VideoPlayer
  },
  data() {
    return {
      errorAutomaticTransitionSeconds: 10,
      defaultVideoHeight: 253,
      defaultVideoWidth: 480,
      playBack: {
        delay: 10,
        startTime: 1.9,
        endTime: 5
      }
    };
  },
  computed: {
    ...mapGetters(["urlStatic"]),
    ...mapGetters("experiment", [
      "hasInteractivePiano",
      "hasText",
      "hasFootnote",
      "textContent",
      "videoName"
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText) return "grid-small-area-big-area-note";
        else return "grid-area-note";
      } else {
        if (this.hasText) return "grid-small-area-big-area";
        else return "grid-single-area";
      }
    },
    videoDimensions() {
      if (this.hasInteractivePiano)
        return {
          height: this.defaultVideoHeight * 1.5,
          width: this.defaultVideoWidth * 1.5
        };
      else
        return {
          height: this.defaultVideoHeight * 2,
          width: this.defaultVideoWidth * 2
        };
    },
    videoWidth() {
      return "--videoWidth: " + this.videoDimensions.width + "px;";
    },
    footnote() {
      var noteMessage;
      if (this.videoName === "")
        noteMessage = `There is no video to be played, the experiment will automatically  go to the next step in ${this.errorAutomaticTransitionSeconds} seconds`;
      else
        noteMessage = `The experiment will automatically go to the next step after the video playback`;
      return noteMessage;
    }
  },
  methods: {},
  mounted() {
    console.log("Just un teste");
  }
};
</script>

<style scoped>
.visual-media-board {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}
.video-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
  width: 100%;
  background-color: coral;
  padding: 10px;
}
.piano-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20%;
  width: calc(var(--videoWidth) * 1.1);
  background-color: rgb(188, 255, 80);
}
</style>