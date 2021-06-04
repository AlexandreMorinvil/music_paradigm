<template>
	<div>
		<div />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['logLabel', 'isInTimeUp']),
	},
	methods: {
		...mapActions('log', ['initializeThoroughLog', 'addThoroughLogBlock', 'concludeThoroughLog']),
		initialize() {
			this.initializeThoroughLog();
		},
		addBlock() {
			this.addThoroughLogBlock();
		},
		conclude(isInTimeUp) {
			this.concludeThoroughLog({ isInTimeUp: isInTimeUp });
		},
	},
	watch: {
		logLabel(newLogLabel, oldLogLabel) {
			if (newLogLabel !== oldLogLabel) this.concludeThoroughLog({ newLogLabel: newLogLabel, oldLogLabel: oldLogLabel });
		},
	},
};
</script>

<style scoped></style>
