<template>
	<div id="piano-display" :class="color">
		<svg class="piano-icon">
			<use xlink:href="sprites.svg#icon-piano" />
		</svg>
		&nbsp;{{ soundStatus }}
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('piano', ['isPianoInitialized', 'isPianoPaused']),
		...mapGetters('experiment', ['enableSoundFlag']),
		soundStatus() {
			// If this value is not evaluted, the midi handling is not compatible
			if (!navigator.requestMIDIAccess) return 'ERROR';
			else if (!this.isPianoInitialized) return 'LOAD...';
			else if (this.isPianoPaused) return 'WAIT';
			else return this.enableSoundFlag ? 'ON' : 'OFF';
		},
		color() {
			if (!navigator.requestMIDIAccess) return 'error';
			if (!this.isPianoInitialized) return 'not-ready';
			else if (this.isPianoPaused) return 'paused';
			return this.enableSoundFlag ? 'active' : 'inactive';
		},
	},
};
</script>

<style scoped>
#piano-display {
	display: flex;
	align-items: center;
	width: 200px;
	height: 85%;
}

.piano-icon {
	display: inline-block;
	stroke-width: 1px;
	min-width: 40px;
	width: 40px;
	height: 40px;
}

.active {
	stroke: rgb(0, 200, 0);
	fill: rgb(0, 200, 0);
	color: rgb(0, 200, 0);
}

.paused {
	stroke: rgb(200, 100, 0);
	fill: rgb(200, 100, 0);
	color: rgb(200, 100, 0);
}

.inactive,
.error {
	stroke: rgb(200, 0, 0);
	fill: rgb(200, 0, 0);
	color: rgb(200, 0, 0);
}

.not-ready {
	stroke: rgb(100, 100, 100);
	fill: rgb(100, 100, 100);
	color: rgb(100, 100, 100);
}
</style>
