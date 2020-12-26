<template>
	<div id="image-area">
		<visual-piano id="visual-piano" v-if="hasInteractivePiano" class="visual-element" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import VisualPiano from '@/components/piano/piano-visual-display.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		visualPiano: VisualPiano,
	},
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['hasInteractivePiano', 'hasPicture', 'pictureName']),
	},
};
</script>

<style scoped>
#image-area {
	display: grid;
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.background-image {
	background-size: contain;
	background-repeat: no-repeat;
	background-position: center;
}
/* .wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
} */

/* .visual-element {
	height: 100%;
	width: auto;
	margin: auto;
	object-fit: contain;
} */
</style>
