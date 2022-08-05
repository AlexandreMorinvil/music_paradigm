<template>
	<div :style="dimensions" :class="{'clickable-cell': isClickable}" class="glt-cell">
		<img v-show="isRevealed" :src="urlExperimentResource(imageSrc)" class="glt-image" />
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
		};
	},
	computed: {
		...mapGetters(['urlExperimentResource']),
		...mapGetters('experiment', ['gltCellSize']),
		imageSrc() {
			if (this.overwrittingCellSpecification) return this.overwrittingCellSpecification.imageSrc;
			else return this.cellSpecifications.imageSrc;
		},
		dimensions() {
			return this.heightStyle + this.widthStyle;
		},
		heightStyle() {
			return 'height: ' + this.gltCellSize + 'px;';
		},
		widthStyle() {
			return 'width: ' + this.gltCellSize + 'px;';
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
.glt-cell {
	background-color: rgb(225, 225, 225);
	margin: 8px;
}

.clickable-cell:active {
	filter: brightness(70%);
}

.glt-image {
	height: 100%;
	width: 100%;
}
</style>
