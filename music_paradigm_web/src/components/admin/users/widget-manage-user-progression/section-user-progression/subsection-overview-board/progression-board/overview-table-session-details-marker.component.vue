<template>
	<div v-show="hasExperimentMarker">
		<b class="center-align">{{ text }}</b>
	</div>
</template>

<script>
export default {
	props: {
		session: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	computed: {
		hasExperimentMarker() {
			return Boolean(this.session && this.session.hasExperimentMarker);
		},
		text() {
			if (!this.hasExperimentMarker) return '';
			return this.progressWasSavedText + this.progressPercentageText;
		},
		progressWasSavedText() {
			if (this.session.startCount > 0) return 'Progress saved';
			else return 'Already advanced';
		},
		progressPercentageText() {
			const ratio = this.session.experimentMarkerProgressRatio;
			if (typeof ratio !== 'number') return '';
			if (ratio === 0) return '';
			const percentage = Math.floor(ratio * 100);
			return ` at ${percentage}%`;
		},
	},
};
</script>

<style scoped>
.center-title {
	justify-content: center;
}

.center-align {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	align-content: center;
	text-align: center;
}
</style>
