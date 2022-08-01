<template>
	<div id="image-target-area" class="state-division-image-target">
		<glt-cell-component ref="targetImage" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

import GltCellComponent from '@/components/experiment/glt/glt-cell.component.vue';

export default {
	components: {
		GltCellComponent,
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
