<template>
	<div id="keyboard-area" v-if="hasInteractiveKeyboard" class="centered-content">
		<keyboard-visual-display-component class="visual-keyboard" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import KeyboardVisualDisplayComponent from '@/components/controller/keyboard/keyboard-visual-display.component.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		KeyboardVisualDisplayComponent,
	},
	computed: {
		...mapGetters('experiment', ['hasInteractiveKeyboard']),
	},
};
</script>

<style scoped>
#keyboard-area {
	height: 100%;
	width: 100%;
	min-height: auto;
}

.visual-keyboard {
	min-height: 100px;
}

.centered-content {
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
