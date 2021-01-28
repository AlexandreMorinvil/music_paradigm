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
		...mapActions('log', ['logAddSimmpleBlock']),
		addBlock() {
			if (this.currentStateType === 'playing') this.logAddSimmpleBlock();
		},
	},
};
</script>

<style scoped></style>
