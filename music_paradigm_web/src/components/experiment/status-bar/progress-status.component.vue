<template>
	<div
		id="experiment-progress-bar"
		class="experiment-progress-bar dimensions"
		:class="{ 'experiment-progress-bar-clear': isClearVersion }"
	>
		<div id="experiment-progress" :style="`width: ${progressBarWith}%`"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['hasClearBackground', 'stepsTotalCount', 'stepsLeftCount', 'isInPrelude']),
		isClearVersion() {
			return this.hasClearBackground;
		},
		progressBarWith() {
			if (this.isInPrelude) return 0;
			else return 100 * (1 - this.stepsLeftCount / this.stepsTotalCount);
		},
	},
};
</script>

<style scoped>
.experiment-progress-bar {
	background-color: rgb(20, 20, 20);
	border-bottom-color: rgb(15, 15, 15);
	border-bottom-width: 1px;
	border-bottom-style: solid;
	height: 100%;
}

.experiment-progress-bar-clear {
	background-color: rgb(245, 245, 245);
	border-bottom-color: rgb(240, 240, 240);
}

#experiment-progress {
	background-color: rgb(0, 100, 255);
	height: inherit;
	width: 50%;
}
</style>
