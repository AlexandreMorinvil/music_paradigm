<template>
	<div id="image-area" class="image-area" v-if="hasPicture">
		<img
			:src="urlExperimentResource(pictureName)"
			class="background-image"
			role="img"
			aria-label="image"
		/>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['urlExperimentResource']),
		...mapGetters('experiment', ['hasPicture', 'pictureName']),
	},
};
</script>

<style scoped>
.image-area {
	display: flex;
	height: 100%;
	width: 100%;
	min-height: auto;
	justify-content: center;
	align-items: center;
}

.background-image {
	display: block;
	max-height: 100%;
	max-width: 100%;
	min-height: 100px;
	height: 100%;
	object-fit: contain;
}
</style>
