<template>
	<div id="clicker-area" v-if="hasInteractiveClicker" class="centered-content">
		<clicker-visual-display-component class="visual-clicker" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import ClickerVisualDisplayComponent from '@/components/controller/clicker/clicker-visual-display.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		ClickerVisualDisplayComponent,
	},
	computed: {
		...mapGetters('experiment', ['hasInteractiveClicker']),
	},
};
</script>

<style scoped>
#clicker-area {
	height: 100%;
	width: 100%;
	min-height: auto;
}

.visual-clicker {
	min-height: 100px;
}

.centered-content {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
