<template>
  <div>
    <p v-if="timerCount > 0">Time before start : {{ timerCount }}</p>
    <br />
    <br />
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
    url: {
      type: Object,
      default() {
        return {
          src: "",
          poster: "http://localhost:3000/images/Music_poster.bmp"
        };
      }
    },
    options: {
      type: Object,
      default() {
        return {
          controls: false,
          muted: false,
          height: 720,
          width: 1280
        };
      }
    },
    playBack: {
      type: Object,
      default() {
        return {
          delay: 0,
          startTime: 0.0,
          endTime: 0.0,
          volume: 1.0
        };
      }
    }
  },
  data() {
    return {
      player: null,
      timerCount: this.playBack.delay || 0,
      volume: 0,
      time: 0,
      duration: 0
    };
  },
  mounted() {
    window.playerEvents = this;
    this.playerInitialize();
    this.playerSetPoster(
      this.url.poster || "http://localhost:3000/images/Music_poster.bmp"
    );
    this.playerSetSrc(this.url.src);
    this.playerSetVolume(this.playBack.volume || 1.0);
    this.playerSetTime(this.playBack.startTime || 0.0);
    this.playerSetupEndEvents();
    this.setEndTime(this.playBack.endTime || 0.0);
    this.delayedPlay(this.playBack.delay || 0);
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
        // Customizable options
        // Presence of a control bar
        controls: this.options.controls || false,
        // Muting the video
        muted: this.options.muted || false,
        // Dimensions
        height: this.options.height || 720,
        width: this.options.width || 1280,

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
    delayedPlay(timeInSeconds) {
      setTimeout(() => {
        this.playerPlay();
      }, timeInSeconds * 1000);
    },
    playerPlay() {
      this.player.play();
    },
    playerPause() {
      this.player.pause();
    },
    playerSetPoster(url) {
      this.player.poster(url);
    },
    playerSetSrc(url, type) {
      this.player.src(url);
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
  watch: {
    timerCount: {
      handler(value) {
        if (value > 0) {
          setTimeout(() => {
            this.timerCount--;
          }, 1000);
        }
      },
      immediate: true // This ensures the watcher is triggered upon creation
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
