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
		conclude() {
			this.concludeThoroughLog({ isInTimeUp: this.isInTimeUp });
		},
	},
	watch: {
		logLabel(newLogLabel, oldLogLabel) {
			if (newLogLabel !== oldLogLabel) {
				this.concludeThoroughLog({ newLogLabel: newLogLabel, oldLogLabel: oldLogLabel });
				this.initializeThoroughLog();
			}
		},
	},
};
</script>

<style scoped></style>
