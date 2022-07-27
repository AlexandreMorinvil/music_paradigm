<template>
	<div id="image-target-area" class="state-division-image-target">
		<grid-location-task-image-component ref="targetImage" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import GridLocationTaskImageComponent from '@/components/experiment/grid-location-task/grid-location-task-image.component.vue';

export default {
	components: {
		GridLocationTaskImageComponent,
	},
	methods: {
		loadCellSpecification(cellSpecifiaction) {
			this.$refs.targetImage.updateCellSpecification(cellSpecifiaction);
		},
		showImage() {
			this.$refs.targetImage.reveal();
		},
		hideImage() {
			this.$refs.targetImage.hide();
		},
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>
