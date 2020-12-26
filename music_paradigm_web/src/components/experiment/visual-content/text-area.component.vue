<template>
	<div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">
		{{ textContent }}
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['hasText', 'textContent']),
	},
};
</script>

<style scoped></style>
