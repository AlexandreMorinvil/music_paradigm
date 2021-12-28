<template>
	<div class="form-grid" @submit.prevent>
		<h3>Progression :</h3>
		<progression-dates-adjustment-component ref="progressionDates" />
		<overview-table-component v-show="hasHistory" :overWrittingProgressionHistory="history" v-on:sessionSelected="handleSessionSelection" />
		<div class="inner-inner-widget" v-show="hasSelectedSession">
			<h4 class="session-title">{{ sessionTitle }}</h4>
			<progression-session-adjustment-component ref="sessionAdjustments" />
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import { mapGetters } from 'vuex';

import OverviewTableComponent from '@/components/user/home/overview-table.component.vue';
import ProgressionDatesAdjustmentComponent from './users-progression-dates-adjustment.component.vue';
import ProgressionSessionAdjustmentComponent from './users-progression-session-adjustment.component.vue';

export default {
	components: {
		OverviewTableComponent,
		ProgressionSessionAdjustmentComponent,
		ProgressionDatesAdjustmentComponent,
	},
	data() {
		return {
			wasProgressionModified: false,
			session: {},
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedId', 'userSelectedProgressionHistory', 'hasProgressionHistory']),
		hasHistory() {
			return this.hasProgressionHistory;
		},
		history() {
			return this.userSelectedProgressionHistory;
		},
		hasSelectedSession() {
			return this.hasHistory && Boolean(this.session && this.session.associativeId);
		},
		sessionTitle() {
			const title = this.session ? String(this.session.title) : '';
			return title.toUpperCase();
		},
	},
	methods: {
		bundleProgressionAdjustments() {
			return {
				...this.$refs.progressionDates.bundleAdjustments(),
				...this.$refs.sessionAdjustments.bundleAdjustments(),
			};
		},
		updateWasModifiedStatus() {
			const wasStartTimeAdjustmentModified = this.$refs.progressionDates.wasAdjustmentModified;
			const wasProgressionHistoryAdjustmentModified = this.$refs.sessionAdjustments.verifyWasAdjustmentModified();
			this.wasProgressionModified = wasStartTimeAdjustmentModified || wasProgressionHistoryAdjustmentModified;
		},
		handleSessionSelection(session) {
			if (this.isAlreadySelectedSession(session)) this.unsetSession();
			else this.setSession(session);
		},
		setSession(session) {
			this.session = session || {};
			this.$refs.sessionAdjustments.takeCurrentAdjustments(session || {});
			this.updateWasModifiedStatus();
		},
		unsetSession() {
			this.session = {};
			this.$refs.sessionAdjustments.unsetAdjustments();
			this.updateWasModifiedStatus();
		},
		reFetchSession() {
			if (!this.hasSelectedSession) return;
			const refetchedSession = this.history.find((session) => {
				return session.associativeId == this.session.associativeId && session.associativeIdOrdinalNumber == this.session.associativeIdOrdinalNumber;
			});
			this.setSession(refetchedSession);
		},
		revert() {
			this.$refs.sessionAdjustments.revert();
			this.$refs.progressionDates.revert();
		},
		isAlreadySelectedSession(session) {
			if (!session) return false;
			if (!this.session || !this.session.associativeId || !this.session.associativeIdOrdinalNumber) return false;
			return this.session.associativeId === session.associativeId && this.session.associativeIdOrdinalNumber === session.associativeIdOrdinalNumber;
		},
	},
	mounted() {
		this.$watch(() => this.$refs.progressionDates.wasAdjustmentModified, this.updateWasModifiedStatus, { immediate: true });
		this.$watch(() => this.$refs.sessionAdjustments.wasAdjustmentModified, this.updateWasModifiedStatus, { immediate: true });
	},
	watch: {
		userSelectedId: {
			handler: function () {
				this.unsetSession();
			},
		},
		history: {
			deep: true,
			handler: function () {
				this.reFetchSession();
			},
		},
	},
};
</script>

<style scoped>
.session-title {
	text-align: center;
	margin-bottom: 20px;
}
</style>
