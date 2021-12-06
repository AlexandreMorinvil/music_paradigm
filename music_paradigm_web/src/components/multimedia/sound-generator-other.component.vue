<template>
	<div style="display: none" />
</template>

<script>
export default {
	data() {
		return {
			sound: null,
			VOLUME_LEVEL: 0.05,
		};
	},
	methods: {
		play(audioFile) {
			this.stop();
			this.sound = new Audio(audioFile); // 'beep-count.wav';
			this.sound.volume = this.VOLUME_LEVEL;
			this.sound.play();
		},
		stop() {
			if (this.sound) this.sound.stop();
			this.sound = null;
		},
	},
};
</script>

<style scoped></style>
