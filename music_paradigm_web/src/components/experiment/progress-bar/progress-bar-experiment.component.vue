<template>
	<div id="experiment-progress-bar">
		<div id="experiment-progress" :style="`width: ${progressBarWith}%`"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['stepsTotalCount', 'stepsLeftCount']),
		progressBarWith() {
			return 100 * (1 - this.stepsLeftCount / this.stepsTotalCount);
		},
	},
};
</script>

<style>
#experiment-progress-bar {
	background-color: rgb(20, 20, 20);
	border-bottom-color: rgb(15, 15, 15);
	border-bottom-width: 1px;
	border-bottom-style: solid;
	height: inherit;
}
#experiment-progress {
	background-color: rgb(0, 100, 255);
	height: inherit;
	width: 50%;
}
</style>
