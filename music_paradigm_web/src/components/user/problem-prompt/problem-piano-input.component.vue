<template>
	<problem-prompt-component :title="title" :solutions="solutions" v-on:ok="end" />
</template>

<script>
import ProblemPromptComponent from '@/components/user/problem-prompt/problem-prompt.component.vue';

export default {
	components: {
		ProblemPromptComponent,
	},
	computed: {
		title() {
			return this.$t('user.problem-prompt.piano-input.title');
		},
		solutions() {
			return [this.$t('user.problem-prompt.piano-input.solution-1')];
		},
	},
	methods: {
		end() {
			this.$emit('ok');
		},
	},
};
</script>

<style scoped></style>
