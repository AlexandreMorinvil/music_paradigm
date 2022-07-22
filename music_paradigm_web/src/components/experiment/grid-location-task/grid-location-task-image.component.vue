<template>
	<div :style="dimensions" class="grid-location-task-image-box">
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
			isRevealed: true,
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
	methods: {
		reveal() {
			this.isRevealed = true;
		},
		hide() {
			this.isRevealed = false;
		}
	}
};
</script>

<style scoped>
.grid-location-task-image-box {
	background-color: rgb(225, 225, 225);
	margin: 8px;
}

.grid-location-task-image {
	height: 100%;
	width: 100%;
}
</style>
