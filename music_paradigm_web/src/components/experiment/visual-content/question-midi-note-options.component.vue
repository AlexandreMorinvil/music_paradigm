<template>
	<div id="text-area" class="state-section">
		<p v-if="hasSpecification">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['textSpecification']),
		hasSpecification() {
			return Boolean(this.textSpecification);
		},
		textContent() {
			return this.textSpecification;
		},
		hasMidi() {
			return Boolean(this.textSpecification);
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

	background-color: rgb(245, 245, 245);
}
</style>
