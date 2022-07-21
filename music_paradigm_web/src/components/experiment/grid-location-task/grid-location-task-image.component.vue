<template>
	<div :style="dimensions" class="grid-location-task-image-box">
		<img :src="urlExperimentResource(imageSrc)" class="grid-location-task-image" />
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
					imageId: null,
					position: null,
					imageSrc: null,
				};
			},
		},
		isClickable: {
			type: Boolean,
			default() {
				return false;
			},
		},
	},
	data() {
		return {
			DEFAULT_SQUARE_SIZE: 140,
		};
	},
	computed: {
		...mapGetters(['urlExperimentResource']),
		imageSrc() {
			return this.cellSpecifications.imageSrc;
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
};
</script>

<style scoped>
.grid-location-task-image-box {
	background-color: rgb(225, 225, 225);
	margin: 10px;
}

.grid-location-task-image {
	height: 100%;
	width: 100%;
}
</style>
