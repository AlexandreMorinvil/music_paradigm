<template>
	<div class="pre-session-grid">
		<p class="centered-text">{{ $t('user.pre-session.pre-session-advice.close-all') }}<br />
			<br />{{ $t('user.pre-session.pre-session-advice.web-browser') }}</p>
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
			if (this.isLastStage) return this.$t('user.pre-session.start-session');
			else return this.$t('user.pre-session.continue');
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
