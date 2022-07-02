<template>
	<div id="image-target-area" class="state-section state-division-image-matrix">
		<grid-location-task-image-component />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import GridLocationTaskImageComponent from '@/components/experiment/grid-location-task/grid-location-task-image.component.vue';

export default {
	components: {
		GridLocationTaskImageComponent,
	},
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
