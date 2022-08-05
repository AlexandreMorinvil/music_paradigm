<template>
	<div
		id="glt-grid"
		:class="{ 'hide-cursor': mustHideCursor }"
		class="state-section grid-location-taks-grid-disposition"
	>
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

import { matrix, pseudoRandom } from '@/_helpers';

import ImageMatrixComponent from '@/components/experiment/glt/image-matrix.component.vue';
import ImageTargetComponent from '@/components/experiment/glt/image-target.component.vue';

export default {
	components: {
		ImageTargetComponent,
		ImageMatrixComponent,
	},
	data() {
		return {
			// Status
			isTargetImageDisplayed: false,

			// Results.
			tagetImage: [],
			targetImagePosition: [],
			timeToClick: [],
			positionClicked: [],
			imageAtPositionClicked: [],
			isAnswerRightList: [],

			// Answer handling helpers.
			currentTargetImage: null,
			timeSinceStartOfAnswerPeriod: null,

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
			TIME_DELAY_AFTER_IMAGE_CLICKED: 500,
		};
	},
	computed: {
		...mapGetters('experiment', [
			'answerChoicesImage',
			'answerChoicesValue',
			'gltMustHideBeforeClick',
			'gltPauseBetweenStimuli',
			'gltPauseBetweenPresentations',
			'matrixSizeX',
			'matrixSizeY',
			'matrixUnusedCells',
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
		ignoredCellsList() {
			return matrix.generateIgnoredCellsList(this.matrixUnusedCells, this.matrixDimensionX, this.matrixDimensionY);
		},
		isWaitingForAnswer() {
			return this.answerWaitTimeout !== null;
		},
		interrogationsCount() {
			return this.isAnswerRightList.length;
		},
		rightAnswersCount() {
			return this.isAnswerRightList.filter((isCorrect) => isCorrect).length;
		},
		matrixSetup() {
			return this.$refs.imageMatrix.bundleSetup();
		},
		results() {
			return {
				tagetImage: this.tagetImage,
				targetImagePosition: this.targetImagePosition,
				timeToClick: this.timeToClick,
				positionClicked: this.positionClicked,
				imageAtPositionClicked: this.imageAtPositionClicked,
				isAnswerRightList: this.isAnswerRightList,
				interrogationsCount: this.interrogationsCount,
				rightAnswersCount: this.rightAnswersCount,
			};
		},
		mustHideCursor() {
			return this.isTargetImageDisplayed && this.gltMustHideBeforeClick;
		},
		mustActivateClickability() {
			return this.isWaitingForAnswer && !(this.gltMustHideBeforeClick && this.isTargetImageDisplayed);
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
			this.timeSinceStartOfAnswerPeriod = new Date();
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
			return true;
		},
		handleAnswer(clickedCellSpecifications = {}) {
			// If we are not waiting for an answer, we ignore the answer received.
			if (!this.stopAnswerWait()) return;

			this.hasReceivedAnswerForCurrentStimuli = true;
			this.recordResultsOfStimuli(clickedCellSpecifications);
		},
		recordResultsOfStimuli(clickedCellSpecifications = {}) {
			// Verify of there was an answer or not to handle the cases where no answer is given.
			const hasAnswer = Boolean(clickedCellSpecifications.positionId);

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
			this.tagetImage.push(targetImageSrc);
			this.targetImagePosition.push(convertPositionIdToCoordinates(targetPositionId));

			this.isAnswerRightList.push(targetPositionId === clickedPositionId);
			this.timeToClick.push(hasAnswer ? timeAnswerReceived - this.timeSinceStartOfAnswerPeriod : null);
			this.imageAtPositionClicked.push(hasAnswer ? clickedImageSrc : null);
			this.positionClicked.push(hasAnswer ? convertPositionIdToCoordinates(clickedPositionId) : null);
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
				this.ignoredCellsList, // excludedIndexesList
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
				if (i !== presentationOrderIndexList.length - 1) await this.setTimeout(this.gltPauseBetweenPresentations);
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
				if (!isLastStimuli && shouldWaitBeforeNextStimuli) await this.setTimeout(this.gltPauseBetweenStimuli);
			}
		},
		updateTargetImageStatus(isImageDisplayed) {
			this.isTargetImageDisplayed = isImageDisplayed;
		},
	},
	mounted() {
		this.constructImageBundle();
		this.deactivateMatrixClickability();
		this.$watch(() => this.$refs.imageTarget.isImageDisplayed, this.updateTargetImageStatus, {
			immediate: true,
		});
	},
	watch: {
		mustActivateClickability: {
			handler: function () {
				if (this.mustActivateClickability) this.activateMatrixClickability();
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

.hide-cursor {
	cursor: none;
}
</style>
