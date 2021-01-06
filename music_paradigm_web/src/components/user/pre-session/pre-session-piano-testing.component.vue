<template>
	<div class="pre-session-grid">
		<p class="centered-text">Please close all other applications and webpages before continuing.</p>
		<div>
			<button v-on:click="end" class="button" :class="isLastStage ? 'button-start' : 'button-next'">{{ buttonText }}</button>
		</div>
	</div>
</template>

<script>
import '@/styles/pre-session-template.css';

export default {
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		buttonText() {
			if (this.isLastStage) return 'Start Session';
			else return 'Next';
		},
	},
	methods: {
		end() {
			this.$emit('end-stage');
		},
	},
};
</script>

<style scoped></style>
