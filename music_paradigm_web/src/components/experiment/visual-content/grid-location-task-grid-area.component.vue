<template>
	<div id="grid-location-task-grid" class="state-section grid-location-taks-grid-disposition">
		<image-target-component :cellSpecificationsList="imageBundle" class="image-target-area state-section" />
		<image-matrix-component
			:dimensionX="matrixDimensionX"
			:dimensionY="matrixDimensionY"
			:cellSpecificationsList="imageBundle"
			class="image-matrix-area state-section"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import { pseudoRandom } from '@/_helpers';

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
			imageBundle: [],
		};
	},
	computed: {
		...mapGetters('experiment', [
			'answerChoicesImage',
			'answerChoicesValue',
			'matrixSizeX',
			'matrixSizeY',
			'matrixUsedCellsCount',
			'reproductionSeed',
		]),
		matrixDimensionX() {
			return this.matrixSizeX;
		},
		matrixDimensionY() {
			return this.matrixSizeY;
		},
		totalAvailableImagesCount() {
			return this.answerChoicesImage.length;
		},
		totalMatrixCellsCount() {
			return this.matrixSizeX * this.matrixSizeY;
		},
		totalUsedImagesCount() {
			return Math.min(this.totalMatrixCellsCount, this.matrixUsedCellsCount, this.totalAvailableImagesCount);
		},
	},
	methods: {
		constructImageBundle() {
			this.imageBundle = [];

			// Generate a list of indexes for the images used.
			const imagesUsedIndexList = pseudoRandom.generateReproduciblePermutedFittedIndexList(
				this.totalUsedImagesCount, // range
				this.matrixUsedCellsCount, // resultSize
				this.reproductionSeed, // reproductionSeed
			);

			// Generate a list of indexes for the positions in the matrix for the images used.
			const positionsUsedIndexList = pseudoRandom.generateReproduciblePermutedFittedIndexList(
				this.totalMatrixCellsCount, // range
				this.matrixUsedCellsCount, // resultSize
				this.reproductionSeed, // reproductionSeed
			);

			// Generate a list of objects with the image and position.
			for (const i in imagesUsedIndexList) {
				const imageIndex = imagesUsedIndexList[i];
				this.imageBundle.push({
					imageId: imageIndex,
					positionId: positionsUsedIndexList[i],
					imageSrc: this.answerChoicesImage[imageIndex],
				});
			}
		},
	},
	mounted() {
		this.constructImageBundle();
	},
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
