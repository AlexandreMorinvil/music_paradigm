<template>
	<div id="experiment-progress-bar" class="dimensions">
		<div id="experiment-progress" :style="`width: ${progressBarWith}%`"></div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['stepsTotalCount', 'stepsLeftCount', 'isInPrelude']),
		progressBarWith() {
			if (this.isInPrelude) return 0;
			else return 100 * (1 - this.stepsLeftCount / this.stepsTotalCount);
		},
	},
};
</script>

<style scoped>
#experiment-progress-bar {
	background-color: rgb(20, 20, 20);
	border-bottom-color: rgb(15, 15, 15);
	border-bottom-width: 1px;
	border-bottom-style: solid;
	height: 100%;
}

#experiment-progress {
	background-color: rgb(0, 100, 255);
	height: inherit;
	width: 50%;
}
</style>
