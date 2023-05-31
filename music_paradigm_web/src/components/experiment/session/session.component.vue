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
			'mustKeepMarkerAfterEnd',
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
			this.concludeSession({
				isInTimeUp: this.isInTimeUp, 
				mustKeepMarkerAfterEnd: this.mustKeepMarkerAfterEnd,
			});
		},
	},
};
</script>

<style scoped></style>
