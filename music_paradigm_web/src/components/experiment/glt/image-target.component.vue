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
	data() {
		return {
			// Status
			isImageDisplayed: false,
		};
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
	mounted() {
		this.$watch(
			() => this.$refs.targetImage.isRevealed,
			(isRevealed) => {
				this.isImageDisplayed = isRevealed;
			},
			{ immediate: true },
		);
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
