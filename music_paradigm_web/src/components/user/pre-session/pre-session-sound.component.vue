<template>
	<div class="pre-session-grid">
		<p class="centered-text">{{ message }}</p>
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
	data() {
		return {
			message: 'You should now hear a piano sound.\n\nPlease Adjust the volume to a confortable level.',
		};
	},
	computed: {
		buttonText() {
			if (this.isLastStage) return 'Start Session';
			else return 'Continue';
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
