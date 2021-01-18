<template>
	<problem-prompt-component :title="title" :solutions="solutions" :conclusion="conclusion" v-on:ok="end" />
</template>

<script>
import ProblemPromptComponent from '@/components/user/problem-prompt/problem-prompt.component.vue';

export default {
	components: {
		ProblemPromptComponent,
	},
	computed: {
		title() {
			return this.$t('user.problem-prompt.piano-sound.title');
		},
		solutions() {
			return [
				this.$t('user.problem-prompt.piano-sound.solution-1'),
				this.$t('user.problem-prompt.piano-sound.solution-2'),
				this.$t('user.problem-prompt.piano-sound.solution-3'),
				this.$t('user.problem-prompt.piano-sound.solution-4'),
			];
		},
		conclusion() {
			return this.$t('user.problem-prompt.piano-sound.conclusion');
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
