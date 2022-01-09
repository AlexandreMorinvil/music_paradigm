<template>
	<div id="piano-area" v-if="hasInteractivePiano" class="centered-content">
		<piano-visual-display-component class="visual-piano" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import PianoVisualDisplayComponent from '@/components/controller/piano/piano-visual-display.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		PianoVisualDisplayComponent,
	},
	computed: {
		...mapGetters('experiment', ['hasInteractivePiano']),
	},
};
</script>

<style scoped>
#piano-area {
	height: 100%;
	width: 100%;
	min-height: auto;
}

.visual-piano {
	min-height: 100px;
}

.centered-content {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
