<template>
	<div class="form-grid" @submit.prevent>
		<h3>Progression :</h3>
		<progression-dates-adjustment-component ref="progressionDates" />
		<progression-history-adjustment-component ref="progressionHistory" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import ProgressionDatesAdjustmentComponent from './users-progression-dates-adjustment.component.vue';
import ProgressionHistoryAdjustmentComponent from './users-progression-history-adjustment.component.vue';

export default {
	components: {
		ProgressionHistoryAdjustmentComponent,
		ProgressionDatesAdjustmentComponent,
	},
	data() {
		return {
			wasProgressionModified: false,
		};
	},
	computed: {
		progressionHistory() {
			return this.userSelectedProgressionHistory;
		},
	},
	methods: {
		bundleProgressionAdjustments() {
			return {
				...this.$refs.progressionDates.bundleAdjustments(),
			};
		},
		updateWasModifiedStatus() {
			const wasStartTimeAdjustmentModified = this.$refs.progressionDates.wasAdjustmentModified;
			const wasProgressionHistoryAdjustmentModified = this.$refs.progressionHistory.wasAdjustmentModified;
			this.wasProgressionModified = wasStartTimeAdjustmentModified || wasProgressionHistoryAdjustmentModified;
		},
	},
	mounted() {
		this.$watch(() => this.$refs.progressionDates.wasAdjustmentModified, this.updateWasModifiedStatus, { immediate: true });
		this.$watch(() => this.$refs.progressionHistory.wasAdjustmentModified, this.updateWasModifiedStatus, { immediate: true });
	},
};
</script>

<style scoped></style>
