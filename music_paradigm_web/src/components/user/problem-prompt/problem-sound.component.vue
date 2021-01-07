<template>
	<problem-prompt-component :title="title" :solutions="solutions" :conclusion="conclusion" v-on:ok="end" />
</template>

<script>
import ProblemPromptComponent from '@/components/user/problem-prompt/problem-prompt.component.vue';

export default {
	components: {
		ProblemPromptComponent,
	},
	data() {
		return {
			title: 'No sound heard',
		};
	},
	computed: {
		solutions() {
			return [
				'Verify that the volume (if too low, it might not be audible).',
				'Verify that the volume of your device is not on mute.',
				'Close this window and restry on a now page.',
				'Turn off the computer and retry.',
			];
		},
		conclusion() {
			return (
				'If the solution(s) above did not fix the problem:\n' +
				'It is likely that there is a problem with the sound of your computer.\n' +
				'Please contact the operator of the platform for further technical support.'
			);
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
