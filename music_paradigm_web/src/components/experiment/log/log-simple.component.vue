<template>
	<div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['currentStateType']),
	},
	methods: {
		...mapActions('log', ['addSimmpleLogBlock']),
		addBlock() {
			if (this.currentStateType === 'playing') this.addSimmpleLogBlock();
		},
	},
};
</script>

<style scoped></style>
