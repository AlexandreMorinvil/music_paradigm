<template>
	<!-- This structure was used instead of using a standard <img /> element due to issues with the size restrictions
	on the standard image HTML elements. By using this structure, we can easily guarrantee that the image will never
	overflow or expend its contant as it is merely the "contained" and non-repeated background of a <span> element -->
	<div id="image-area" v-if="hasPicture">
		<span
			:style="
				'background: url(' +
				urlExperimentRessource(pictureName) +
				');' +
				'background-size: contain;' +
				'background-repeat: no-repeat;' +
				'background-position: center;'
			"
			class="background-image"
			role="img"
			aria-label="image"
		>
		</span>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['hasPicture', 'pictureName']),
	},
};
</script>

<style scoped>
#image-area {
	height: 100%;
	width: 100%;
	min-height: auto;
}

.background-image {
	display: block;
	width: 100%;
	height: 100%;
	min-height: 100px;
}
</style>
