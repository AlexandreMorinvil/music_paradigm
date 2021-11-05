<template>
	<div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { log } from '@/_helpers';

export default {
	computed: {
		...mapGetters('experiment', ['currentStateType']),
	},
	methods: {
		...mapActions('log', ['addSimmpleLogBlock']),
		addBlock() {
			if (log.isStateConsideredInSimpleLog(this.currentStateType)) this.addSimmpleLogBlock();
		},
	},
};
</script>

<style scoped></style>
