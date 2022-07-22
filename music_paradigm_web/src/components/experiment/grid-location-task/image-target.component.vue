<template>
	<div id="image-target-area" class="state-division-image-target">
		<grid-location-task-image-component :isClickable="false" ref="targetImage" />
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
		showImage(imageSrc) {
			this.$refs.targetImage.reveal(imageSrc);
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
