<template>
	<div style="display: none" />
</template>

<script>
export default {
	data() {
		return {
			audio: new Audio(),
			VOLUME_LEVEL: 0.125,
		};
	},
	computed: {
		isPlaying() {
			return this.audio.paused;
		},
	},
	methods: {
		play(audioArrayBuffer) {
			this.stop();
			const blob = new Blob([audioArrayBuffer]);
			this.audio.src = URL.createObjectURL(blob);
			this.audio.play();
		},
		stop() {
			this.audio.pause();
			this.audio.currentTime = 0;
		},
		signalEnded() {
			this.$emit('finished');
		},
	},
	mounted() {
		this.audio.volume = this.VOLUME_LEVEL;
		this.audio.onended = this.signalEnded;
	},
};
</script>

<style scoped></style>
