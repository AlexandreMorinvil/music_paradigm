<template>
	<div id="grid-location-task-grid" class="state-section grid-location-taks-grid-disposition">
		<image-target-component :cellSpecificationsList="imageBundle" class="image-target-part" ref="imageTarget" />
		<image-matrix-component
			:dimensionX="matrixDimensionX"
			:dimensionY="matrixDimensionY"
			:cellSpecificationsList="imageBundle"
			class="image-matrix-part"
			ref="imageMatrix"
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
			imageBundle: [],
			DEFAULT_SQUARE_SIZE: 200,
			IMAGE_REPRODUCTION_SEED_MODIFIER: 'image',
			POSITION_REPRODUCTION_SEED_MODIFIER: 'position',
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
		timeout(timeInMilliseconds) {
			return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));
		},
		async cueTargetImage(iamgeSrc) {
			this.$refs.imageTarget.showImage(iamgeSrc);
			await this.timeout(1000);
			this.$refs.imageTarget.hideImage(iamgeSrc);
		},
		async showMatrixImage(positionId) {
			this.$refs.imageMatrix.revealCell(positionId);
			await this.timeout(1000);
			this.$refs.imageMatrix.hideCell(positionId);
		},
		constructImageBundle() {
			this.imageBundle = [];

			// Generate a list of indexes for the images used.
			const imagesUsedIndexList = pseudoRandom.generateReproduciblePermutedFittedIndexList(
				this.totalUsedImagesCount, // range
				this.matrixUsedCellsCount, // resultSize
				this.reproductionSeed + this.IMAGE_REPRODUCTION_SEED_MODIFIER, // reproductionSeed
			);

			// Generate a list of indexes for the positions in the matrix for the images used.
			const positionsUsedIndexList = pseudoRandom.generateReproduciblePermutedFittedIndexList(
				this.totalMatrixCellsCount, // range
				this.matrixUsedCellsCount, // resultSize
				this.reproductionSeed + this.POSITION_REPRODUCTION_SEED_MODIFIER, // reproductionSeed
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
	align-items: center;
}

.image-target-part {
}

.image-matrix-part {
}
</style>
