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
			return this.$t('user.problem-prompt.clicker-input.title');
		},
		solutions() {
			return [this.$t('user.problem-prompt.clicker-input.solution-1')];
		},
		conclusion() {
			return this.$t('user.problem-prompt.clicker-sound.conclusion');
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
