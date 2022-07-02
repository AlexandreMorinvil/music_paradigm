<template>
	<img :src="imageSource" :style="dimensions" alt="No image">
</template>

<script>
import '@/styles/experiment-content-template.css';

export default {
    props: {
		imageSource: {
			type: String,
			default() {
				return '';
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
			DEFAULT_SQUARE_SIZE: 200,
		};
	},
    computed: {
        dimensions() {
            return this.heightStyle + this.widthStyle;
        },
        heightStyle() {
            return 'height: ' + this.DEFAULT_SQUARE_SIZE + 'px;';
        },
        widthStyle() {
            return 'width: ' + this.DEFAULT_SQUARE_SIZE + 'px;';
        }
    }
};
</script>

<style scoped>
</style>
