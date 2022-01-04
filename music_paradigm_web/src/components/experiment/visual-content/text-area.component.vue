<template>
	<div id="text-area" v-if="hasText" class="state-section state-division-text">
		<p class="centering">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['textContent']),
		hasText() {
			return Boolean(this.textContent);
		},
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

.centering {
	width: 60%;
}
</style>
