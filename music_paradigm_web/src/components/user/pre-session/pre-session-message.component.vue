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
import { mapGetters } from 'vuex';

export default {
	props: {
		isLastStage: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		...mapGetters('session', ['preSessionMessage']),
		message() {
			return this.preSessionMessage;
		},
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
