<template>
	<div id="grid-location-task-grid" class="state-section grid-location-taks-grid-disposition">
		<image-target-component :cellSpecificationsList="cellSpecificationsList" ref="imageTarget" />
		<image-matrix-component
			:dimensionX="matrixDimensionX"
			:dimensionY="matrixDimensionY"
			:cellSpecificationsList="cellSpecificationsList"
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
			cellSpecificationsList: [],
			DEFAULT_SQUARE_SIZE: 200,
			IMAGE_REPRODUCTION_SEED_MODIFIER: 'image',
			POSITION_REPRODUCTION_SEED_MODIFIER: 'position',
			TIME_BETWEEN_PRESENTATION_DISPLAY: 1000,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'answerChoicesImage',
			'answerChoicesValue',
			'matrixSizeX',
			'matrixSizeY',
			'matrixUsedCellsCount',
			'presentationTime',
			'reproductionSeed',
			'stimuliTime',
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
		setTimeout(timeInMilliseconds) {
			return new Promise((resolve) => setTimeout(resolve, timeInMilliseconds));
		},
		async cueTargetImage(iamgeSrc) {
			this.$refs.imageTarget.showImage(iamgeSrc);
			await this.setTimeout(this.stimuliTime);
			this.$refs.imageTarget.hideImage(iamgeSrc);
		},
		async showMatrixImage(positionId) {
			this.$refs.imageMatrix.revealCell(positionId);
			await this.setTimeout(this.presentationTime);
			this.$refs.imageMatrix.hideCell(positionId);
		},
		constructImageBundle() {
			this.cellSpecificationsList = [];

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
				this.cellSpecificationsList.push({
					imageId: imageIndex,
					positionId: positionsUsedIndexList[i],
					imageSrc: this.answerChoicesImage[imageIndex],
				});
			}
		},
		async presentMatrix() {
			// Generate a random presentation order.
			const presentationOrderIndexList = pseudoRandom.generateReproduciblePermutedIndexList(
				this.cellSpecificationsList.length, // range
				Math.random(), // reproductionSeed
			);

			// Go over all the cells to present in the oder of the random presentation order index list.
			for (const i in presentationOrderIndexList) {

				// Present the cell that is at the order indicated by presentationOrderIndexList.
				const orderIndex = presentationOrderIndexList[i];
				const { positionId } = this.cellSpecificationsList[orderIndex];
				await this.showMatrixImage(positionId);

				// Wait a small delay before moving on to the next image.
				// If it is the last cell to display, we ignore the delay.
				if (i !== presentationOrderIndexList.length - 1)
					await this.setTimeout(this.TIME_BETWEEN_PRESENTATION_DISPLAY);
			}
		}
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
</style>
