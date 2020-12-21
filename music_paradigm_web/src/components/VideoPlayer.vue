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
import videojs from'video.js/dist/video.min.js';
import'video.js/dist/video-js.min.css';

export default{
	name: 'VideoPlayer',
	props: {
		src: {
			type: String,
			default() {
				return'';
			}
		},
		dimension: {
			type: Object,
			default() {
				return{
					height: 100,
					width: 100
				};
			}
		},
		playBack: {
			type: Object,
			default() {
				return{
					startTime: 0.0,
					endTime: 0.0
				};
			}
		}
	},
	data() {
		return{
			player: null,
			volume: 0,
			time: 0,
			duration: 0
		};
	},
	methods: {
		// Video initialization method
		playerInitialize() {
			const initialOptions = {
				controls: false,
				userActions: {},
				muted: false,
				height: this.dimension.height,
				width: this.dimension.width,
				preload: 'auto',
				autoplay: false // The autoplay is managed manually to handle delays
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
		playerSetSrc(src, type = 'video/mp4') {
			this.player.src({ type: type, src: src });
		},
		playerSetVolume(float) {
			this.player.volume(float);
		},
		playerSetTime(time) {
			this.player.currentTime(time);
		},

		// Event handling methods
		playerCheckDelayedStop() {
			this.time = this.player.currentTime();
			if(this.time >= this.duration) {
				this.playerPause();
				this.$emit('preProgrammedEnd');
			}
		},
		playerEventEnded() {
			this.$emit('finishedPlayback');
		},
		playerEventError() {
			const error = this.player.error().message;
			console.log(error);
			alert(error);
		},
		// Event listening methods
		setEndTime(endTime) {
			if(endTime !== 0.0) {
				this.duration = endTime;
				this.player.on('timeupdate', function() {
					window.playerEvents.playerCheckDelayedStop();
				});
			} else{
				this.duration = this.player.duration();
			}
		},
		playerSetupEndEvents() {
			this.$once('preProgrammedEnd', function() {
				window.playerEvents.playerEventEnded();
			});
			this.player.on('ended', function() {
				window.playerEvents.playerEventEnded();
			});
			this.player.on('error', function() {
				window.playerEvents.playerEventError();
			});
		}
	},
	mounted() {
		window.playerEvents = this;
		this.playerInitialize();
		this.playerSetSrc(this.src);
		this.playerSetVolume(0.2);
		this.playerSetTime(this.playBack.startTime || 0.0);
		this.playerSetupEndEvents();
		this.setEndTime(this.playBack.endTime || 0.0);
	},
	beforeDestroy() {
		if(this.player) {
			this.player.dispose();
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
