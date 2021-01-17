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
			title: 'No MIDI input received',
			solutions: ['Try uplugging and replugging the keyboard.\nPress the OK buton to restart the MIDI keyboard initialization.'],
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
