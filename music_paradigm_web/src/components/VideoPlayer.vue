<template>
  <div>
    <video ref="videoPlayer" class="video-js">
      <p class="vjs-no-js">
        To view this video please enable JavaScript, and consider upgrading to a
        web browser that
        <a
          href="https://videojs.com/html5-video-support/"
          target="_blank"
        >supports HTML5 video</a>
      </p>
    </video>
  </div>
</template>

<script>
import videojs from "video.js/dist/video.min.js";
import "video.js/dist/video-js.min.css";

export default {
  name: "VideoPlayer",
  props: {
    src: {
      type: String,
      default() {
        return "";
      }
    },
    dimension: {
      type: Object,
      default() {
        return {
          height: 100,
          width: 100
        };
      }
    },
    playBack: {
      type: Object,
      default() {
        return {
          startTime: 0.0,
          endTime: 0.0,
          volume: 1.0
        };
      }
    }
  },
  // poster: "http://localhost:3000/images/Music_poster.bmp";
  // poster: "sprites.svg#emoji-frown" //this.apiUrl + "/static/" + "assets/images/Music_poster.bmp"
  data() {
    return {
      player: null,
      volume: 0,
      time: 0,
      duration: 0
    };
  },
  mounted() {
    window.playerEvents = this;
    this.playerInitialize();
    // this.playerSetPoster(
    //   this.src.poster || "http://localhost:3000/images/Music_poster.bmp"
    // );
    this.playerSetSrc(this.src);
    this.playerSetVolume(this.playBack.volume || 1.0);
    this.playerSetTime(this.playBack.startTime || 0.0);
    this.playerSetupEndEvents();
    this.setEndTime(this.playBack.endTime || 0.0);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
  methods: {
    // Video initialization method
    playerInitialize() {
      const initialOptions = {
        controls: false,
        muted: false,
        // Dimensions
        height: this.dimension.height,
        width: this.dimension.width,

        // Immutable options
        // The medias have to be preloaded for more smooth transitions
        preload: "auto",
        // The autoplay is managed with the playback options
        autoplay: false,
        // We want the video not to be sentive to inputs
        userActions: {}
      };
      this.player = videojs(this.$refs.videoPlayer, initialOptions);
    },

    // Video control methods
    playerPlay() {
      this.player.play();
    },
    playerPause() {
      this.player.pause();
    },
    playerSetPoster(src) {
      this.player.poster(src);
    },
    playerSetSrc(src, type) {
      this.player.src(src);
    },
    playerSetVolume(float) {
      this.player.volume(float);
    },
    playerSetTime(time) {
      this.player.currentTime(time);
    },

    // Event handling methods
    playerCheckDelayedStop(endTime) {
      this.time = this.player.currentTime();
      if (this.time >= this.duration) {
        this.playerPause();
        this.$emit("preProgrammedEnd");
      }
    },
    playerEventEnded() {
      console.log("ended");
    },
    playerEventError() {
      const error = this.player.error().message;
      console.log(error);
      alert(error);
    },

    // Event listening methods
    setEndTime(endTime) {
      if (endTime !== 0.0) {
        this.duration = endTime;
        this.player.on("timeupdate", function(e) {
          window.playerEvents.playerCheckDelayedStop();
        });
      } else {
        this.duration = this.player.duration();
      }
    },
    playerSetupEndEvents() {
      this.$once("preProgrammedEnd", function() {
        window.playerEvents.playerEventEnded();
      });
      this.player.on("ended", function() {
        window.playerEvents.playerEventEnded();
      });
      this.player.on("error", function() {
        window.playerEvents.playerEventError();
      });
    }
  },
  watch: {}
};
</script>

<style scoped>
video {
  width: 3050px;
  height: 160px;
  background-color: lightblue;
}
</style>
