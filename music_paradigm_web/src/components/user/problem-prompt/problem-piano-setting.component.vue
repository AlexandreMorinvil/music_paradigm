<template>
	<problem-prompt-component :title="title" :solutions="solutions" v-on:ok="end" />
</template>

<script>
import ProblemPromptComponent from '@/components/user/problem-prompt/problem-prompt.component.vue';

export default {
	components: {
		ProblemPromptComponent,
	},
	data() {
		return {
			title: 'MIDI keyboard not reachable',
			solutions: [
				'Make sure you are using the Google Chrome web browser. Other web browsers as Firefox and Internet Explorer are not compatible with the MIDI keyboard.',
			],
		};
	},
	methods: {
		end() {
			this.$emit('ok');
		},
	},
};
</script>

<style scoped></style>
