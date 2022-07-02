<template>
	<div id="grid-location-task-grid" class="state-section grid-location-taks-grid-disposition">
		<image-target-component class="image-target-area state-section" />
		<image-matrix-component class="image-matrix-area state-section" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import ImageMatrixComponent from '@/components/experiment/grid-location-task/image-matrix.component.vue';
import ImageTargetComponent from '@/components/experiment/grid-location-task/image-target.component.vue';

export default {
	components: {
		ImageTargetComponent,
		ImageMatrixComponent,
	},
	data() {
		return {
			DEFAULT_SQUARE_SIZE: 200,
			UsedImagesSet: [],
		};
	},
	computed: {
		...mapGetters('experiment', ['answerChoicesImage', 'answerChoicesValue']),
		totalUsedImagesCount() {
			return Math.min(this.matrixSizeX * this.matrixSizeY, this.answerChoicesImage);
		},
	},
	methods: {
		// constructUsedImagesSet() {

		// },
	}
};
</script>

<style scoped>
.grid-location-taks-grid-disposition {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: stretch;
}
</style>
