<template>
	<img :src="urlExperimentResource(imageSrc)" :style="dimensions" alt="No image" class="matrix-image" />
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
			DEFAULT_SQUARE_SIZE: 100,
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
.matrix-image {
	background-color: grey;
}
</style>
