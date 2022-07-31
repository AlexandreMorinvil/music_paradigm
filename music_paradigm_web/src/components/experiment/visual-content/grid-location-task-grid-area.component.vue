<template>
	<div id="grid-location-task-grid" class="state-section grid-location-taks-grid-disposition">
		<image-target-component ref="imageTarget" />
		<image-matrix-component
			class="image-matrix-part"
			:dimensionX="matrixDimensionX"
			:dimensionY="matrixDimensionY"
			:cellSpecificationsList="cellSpecificationsList"
			v-on:cellSelected="handleAnswer"
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
			// Results.
			tagetImage: [],
			targetImagePosition: [],
			timeToClick: [],
			positionClicked: [],
			imageAtPositionClicked: [],

			// Answer handling helpers.
			currentTargetImage: null,
			timeTargetCueWasGiven: null,

			// Setup of the matrix.
			cellSpecificationsList: [],

			// Answer handling.
			hasReceivedAnswerForCurrentStimuli: false,
			resolveToExcecuteWhenAnswerIsReceived: null,
			answerWaitTimeout: null,

			// Reproduction seed modifiers.
			IMAGE_REPRODUCTION_SEED_MODIFIER: 'image',
			POSITION_REPRODUCTION_SEED_MODIFIER: 'position',

			// Times constants.
			TIME_BETWEEN_PRESENTATION_DISPLAY: 500,
			TIME_DELAY_BETWEEN_TEST_DISPLAYS: 1500,
			TIME_DELAY_AFTER_IMAGE_CLICKED: 1000,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'answerChoicesImage',
			'answerChoicesValue',
			'matrixSizeX',
			'matrixSizeY',
			'matrixUsedCellsCount',
			'maxResponseTime',
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
		isWaitingForAnswer() {
			return this.answerWaitTimeout !== null;
		},
	},
	methods: {
		setTimeout(timeInMilliseconds) {
			return new Promise((resolve) => {
				setTimeout(resolve, timeInMilliseconds);
			});
		},
		setTimeoutForAnswer(timeDisplayImageInMilliseconds, timeTakeAnswerInMilliseconds) {
			return new Promise((resolve) => {
				// When this promise is resolved, we no longer wait for answers.
				this.hasReceivedAnswerForCurrentStimuli = false;
				this.resolveWhenAnswered = resolve;

				// Wait a first amount of time while the image is displayed.
				this.answerWaitTimeout = setTimeout(() => {
					this.hideTargetImage();

					// Wait another amount of time while the image is hidden.
					this.answerWaitTimeout = setTimeout(this.stopAnswerWait, timeTakeAnswerInMilliseconds);
				}, timeDisplayImageInMilliseconds);
			});
		},
		async askTargetImage(cellSpecifiaction) {
			this.currentTargetImage = cellSpecifiaction;
			this.timeTargetCueWasGiven = new Date();
			this.showTargetImage(cellSpecifiaction);
			await this.setTimeoutForAnswer(this.stimuliTime, this.maxResponseTime);
			if (this.hasReceivedAnswerForCurrentStimuli) await this.setTimeout(this.TIME_DELAY_AFTER_IMAGE_CLICKED);
			this.hideTargetImage();
		},
		async showMatrixImage(positionId) {
			this.presentImageInMatrix(positionId);
			await this.setTimeout(this.presentationTime);
			this.hideImageInMatrix(positionId);
		},
		showTargetImage(cellSpecifiaction) {
			this.$refs.imageTarget.loadCellSpecification(cellSpecifiaction);
			this.$refs.imageTarget.showImage(cellSpecifiaction);
		},
		hideTargetImage() {
			this.$refs.imageTarget.hideImage();
		},
		presentImageInMatrix(positionId) {
			this.$refs.imageMatrix.revealCell(positionId);
		},
		hideImageInMatrix(positionId) {
			this.$refs.imageMatrix.hideCell(positionId);
		},
		activateMatrixClickability() {
			this.$refs.imageMatrix.activateClickability();
		},
		deactivateMatrixClickability() {
			this.$refs.imageMatrix.deactivateClickability();
		},
		stopAnswerWait() {
			if (!this.resolveWhenAnswered) return false;
			this.resolveWhenAnswered();
			this.resolveWhenAnswered = null;
			clearTimeout(this.answerWaitTimeout);
			this.answerWaitTimeout = null;
			this.hasReceivedAnswerForCurrentStimuli = true;
			return true;
		},
		handleAnswer(clickedCellSpecifications) {
			// If we are not waiting for an answer, we ignore the answer received.
			if (!this.stopAnswerWait()) return;

			// Retreive infromation of the answer.
			const timeAnswerReceived = new Date();
			const { imageSrc: targetImageSrc, positionId: targetPositionId } = this.currentTargetImage;
			const { imageSrc: clickedImageSrc, positionId: clickedPositionId } = clickedCellSpecifications;
			const convertPositionIdToCoordinates = (positionId) => {
				const { columnIndex, rowIndex } = this.$refs.imageMatrix.getCellCoordinates(positionId);
				return {
					x: columnIndex + 1,
					y: rowIndex + 1,
				};
			};

			// Record the information of the position clicked.
			this.timeToClick.push(timeAnswerReceived - this.timeTargetCueWasGiven);
			this.tagetImage.push(targetImageSrc);
			this.targetImagePosition.push(convertPositionIdToCoordinates(targetPositionId));
			this.imageAtPositionClicked.push(clickedImageSrc);
			this.positionClicked.push(convertPositionIdToCoordinates(clickedPositionId));
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
					positionId: positionsUsedIndexList[i],
					imageSrc: this.answerChoicesImage[imageIndex],
				});
			}
		},
		generateRandomPresentationOrder() {
			return pseudoRandom.generateReproduciblePermutedIndexList(
				this.cellSpecificationsList.length, // range
				Math.random(), // reproductionSeed
			);
		},
		async presentMatrix() {
			// Go over all the cells to present in the oder of the random presentation order index list.
			const presentationOrderIndexList = this.generateRandomPresentationOrder();
			for (const i in presentationOrderIndexList) {
				// Present the cell that is at the order indicated by presentationOrderIndexList.
				const orderIndex = presentationOrderIndexList[i];
				const { positionId } = this.cellSpecificationsList[orderIndex];
				await this.showMatrixImage(positionId);

				// Wait a small delay before moving on to the next image.
				// If it is the last cell to display, we ignore the delay.
				if (i !== presentationOrderIndexList.length - 1) await this.setTimeout(this.TIME_BETWEEN_PRESENTATION_DISPLAY);
			}
		},
		async askImagePositions() {
			// Go over all the cells to present in the oder of the random presentation order index list.
			const presentationOrderIndexList = this.generateRandomPresentationOrder();
			for (const i in presentationOrderIndexList) {
				// Present the cell that is at the order indicated by presentationOrderIndexList.
				const orderIndex = presentationOrderIndexList[i];
				const cellSpecifiaction = this.cellSpecificationsList[orderIndex];
				await this.askTargetImage(cellSpecifiaction);

				// Wait a small delay before moving on to the next image.
				// If it is the last cell to display, we ignore the delay.
				const isLastStimuli = i === presentationOrderIndexList.length - 1;
				const shouldWaitBeforeNextStimuli = this.hasReceivedAnswerForCurrentStimuli;
				if (!isLastStimuli && shouldWaitBeforeNextStimuli) await this.setTimeout(this.TIME_DELAY_BETWEEN_TEST_DISPLAYS);
			}
		},
		reportMatrixSetup() {
			return this.$refs.imageMatrix.bundleSetup();
		},
		reportResults() {
			return;
		},
	},
	mounted() {
		this.constructImageBundle();
		this.deactivateMatrixClickability();
	},
	watch: {
		isWaitingForAnswer: {
			handler: function (isWaiting) {
				if (isWaiting) this.activateMatrixClickability();
				else this.deactivateMatrixClickability();
			},
		},
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
