<template>
	<div id="text-area" v-if="hasTextAfterQuestionAsked" class="state-section state-division-text">
		<p v-if="isRevealed" class="centering text-color">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			isRevealed: false,
		};
	},
	computed: {
		...mapGetters('experiment', ['textAfterQuestionAsked']),
		textContent() {
			return this.textAfterQuestionAsked;
		},
		hasTextAfterQuestionAsked() {
			return Boolean(this.textAfterQuestionAsked);
		}
	},
	methods: {
		reveal() {
			this.isRevealed = true;
		},
	},
};
</script>

<style scoped>
.text-color {
	color:rgb(66, 209, 34);
}

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
