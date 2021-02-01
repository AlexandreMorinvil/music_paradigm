<template>
	<div>
		<div />
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	methods: {
		...mapActions('log', ['initializeThoroughLog', 'addThoroughLogBlock', 'concludeThoroughLog']),
		initialize() {
			this.initializeThoroughLog();
		},
		addBlock() {
			this.addThoroughLogBlock();
		},
		conclude() {
			this.concludeThoroughLog();
		},
	},
};
</script>

<style scoped></style>
