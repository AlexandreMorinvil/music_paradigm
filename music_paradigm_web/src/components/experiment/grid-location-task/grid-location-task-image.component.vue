<template>
	<div :style="dimensions" :class="{'clickable-cell': isClickable}" class="grid-location-task-image-box">
		<img v-show="isRevealed" :src="urlExperimentResource(imageSrc)" class="grid-location-task-image" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	props: {
		cellSpecifications: {
			type: Object,
			default() {
				return {
					position: null,
					imageSrc: null,
				};
			},
		},
	},
	data() {
		return {
			isClickable: false,
			isRevealed: false,
			overwrittingCellSpecification: null,
			DEFAULT_SQUARE_SIZE: 140,
		};
	},
	computed: {
		...mapGetters(['urlExperimentResource']),
		imageSrc() {
			if (this.overwrittingCellSpecification) return this.overwrittingCellSpecification.imageSrc;
			else return this.cellSpecifications.imageSrc;
		},
		dimensions() {
			return this.heightStyle + this.widthStyle;
		},
		heightStyle() {
			return 'height: ' + this.DEFAULT_SQUARE_SIZE + 'px;';
		},
		widthStyle() {
			return 'width: ' + this.DEFAULT_SQUARE_SIZE + 'px;';
		},
	},
	methods: {
		updateCellSpecification(cellSpecifiaction) {
			this.overwrittingCellSpecification = cellSpecifiaction;
		},
		reveal() {
			this.isRevealed = true;
		},
		hide() {
			this.isRevealed = false;
		},
		activateClickability() {
			this.isClickable = true;
		},
		deactivateClickability() {
			this.isClickable = false;
		},
	},
};
</script>

<style scoped>
.grid-location-task-image-box {
	background-color: rgb(225, 225, 225);
	margin: 8px;
}

.clickable-cell:active {
	filter: brightness(70%);
}

.grid-location-task-image {
	height: 100%;
	width: 100%;
}
</style>
