<template>
	<div id="visual-media-area">
		<div class="wrapper">
			<img id="image" v-if="hasPicture" :src="urlExperimentRessource(pictureName)" class="visual-element" alt="visual-media" />
		</div>
		<div class="wrapper">
			<visual-piano id="visual-piano" v-if="hasInteractivePiano" class="visual-element" />
		</div>
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
#visual-media-area {
	display: grid;
	height: 100%;
	width: 100%;
	overflow: hidden;
}

.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
}

.visual-element {
	height: 100%;
	width: auto;
	margin: auto;
	object-fit: contain;
}
</style>
