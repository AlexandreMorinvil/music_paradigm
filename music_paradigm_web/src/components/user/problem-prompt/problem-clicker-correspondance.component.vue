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
			return this.$t('user.problem-prompt.clicker-correspondance.title');
		},
		solutions() {
			return [this.$t('user.problem-prompt.clicker-correspondance.solution-1'), this.$t('user.problem-prompt.clicker-correspondance.solution-2')];
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
