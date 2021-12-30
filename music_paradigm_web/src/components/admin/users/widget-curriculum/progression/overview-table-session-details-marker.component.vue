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
			const percentage = this.session.experimentMarkerProgressPercentage || 0;
			if (this.hasExperimentMarker) return `Progress Saved at ${percentage}%`;
			else return '';
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
