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
			title: 'Not corresponding notes',
			solutions: [
				'The MIDI keyboard has two buttons labelled "octave".\nUse those buttons until the keys you press on your MIDI keyboard correspond to the keys displayed.',
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
