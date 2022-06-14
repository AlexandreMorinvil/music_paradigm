<template>
	<div id="image-matrix-area" class="state-section state-division-image-matrix">
		Image matrix
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', []),
	},
};
</script>

<style scoped>
.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>
