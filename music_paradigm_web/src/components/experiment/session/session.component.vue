<template>
	<div />
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiment', [
			'checkpoint',
			'considerExperimentFinished',
			'isFirstIndexPassage',
			'needsResetLoopParameters',
			'isNewBlock',
			'isInTimeUp',
		]),
	},
	methods: {
		...mapActions('session', ['concludeSession', 'initializeSession', 'saveSessionState']),
		initialize() {
			this.initializeSession();
		},
		saveState() {
			if (!this.checkpoint || this.considerExperimentFinished) return;
			else if (this.checkpoint === 'once' && this.isFirstIndexPassage) this.saveSessionState();
			else if (this.checkpoint === 'first' && this.needsResetLoopParameters) this.saveSessionState();
			else if (this.checkpoint === 'all' && this.isNewBlock) this.saveSessionState();
		},
		conclude() {
			this.concludeSession(this.isInTimeUp);
		},
	},
};
</script>

<style scoped></style>
