<template>
	<div class="form-grid" @submit.prevent>
		<!-- Global display of the session -->
		<div class="progression-header">
			<h3>Progression :</h3>
			<button v-on:click="handleRefresh" class="widget-button blue refresh-button">{{ refreshButtonText }}</button>
		</div>
		<progression-dates-adjustment-component ref="progressionDates" />
		<overview-table-component
			v-show="hasHistory"
			:overWrittingProgressionHistory="history"
			:sessionToHightlight="session"
			v-on:sessionSelected="handleSessionSelection"
		>
			<template slot-scope="{ session, index }">
				<overview-table-session-details-component :session="session" :index="index" />
			</template>
		</overview-table-component>

		<!-- Display of the selected session -->
		<div class="inner-inner-widget" v-show="hasSelectedSession">
			<div class="session-header">
				<h4 class="session-title">({{ completeAssociativeId }}) - {{ sessionTitle }}</h4>
				<button v-on:click="handleRefresh" class="widget-button blue refresh-button">{{ refreshButtonText }}</button>
				<button v-on:click="unsetSession" class="widget-button turquoise">Unselect</button>
			</div>
			<progression-session-adjustment-component ref="sessionAdjustments" />
			<progression-session-progress-component ref="sessionProgress" />
			<progression-session-dates-component ref="sessionDates" />
		</div>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import { mapActions, mapGetters } from 'vuex';

import OverviewTableComponent from '@/components/user/home/overview-table.component.vue';
import OverviewTableSessionDetailsComponent from './overview-table-session-details.component.vue';
import ProgressionDatesAdjustmentComponent from './users-progression-dates-adjustment.component.vue';
import ProgressionSessionAdjustmentComponent from './users-progression-session-adjustment.component.vue';
import ProgressionSessionDatesComponent from './users-progression-session-dates.component.vue';
import ProgressionSessionProgressComponent from './users-progression-session-progress.component.vue';

export default {
	components: {
		OverviewTableComponent,
		OverviewTableSessionDetailsComponent,
		ProgressionSessionAdjustmentComponent,
		ProgressionDatesAdjustmentComponent,
		ProgressionSessionProgressComponent,
		ProgressionSessionDatesComponent,
	},
	data() {
		return {
			isRefreshing: false,
			wasProgressionModified: false,
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedId']),
		...mapGetters('users/progressions', [
			'hasProgressionHistory',
			'progressionSelectedHistory',
			'hasSelectedProgressionSession',
			'sessionSelected',
		]),
		session() {
			return this.sessionSelected;
		},
		hasHistory() {
			return this.hasProgressionHistory;
		},
		history() {
			return this.progressionSelectedHistory;
		},
		hasSelectedSession() {
			return this.hasSelectedProgressionSession;
		},
		sessionTitle() {
			const title = this.session ? String(this.session.title) : '';
			return title.toUpperCase();
		},
		refreshButtonText() {
			return this.isRefreshing ? 'Refreshing...' : 'Refresh';
		},
		completeAssociativeId() {
			return `${this.session.associativeId} / ${this.session.associativeIdOrdinalNumber}`;
		},
	},
	methods: {
		...mapActions('users/progressions', ['refreshSelectedUserProgression', 'setSelectedSession', 'unsetSelectedSession']),
		handleRefresh() {
			this.isRefreshing = true;
			this.refreshSelectedUserProgression().finally(() => {
				this.reFetchSession();
				this.isRefreshing = false;
			});
		},
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
			this.setSelectedSession(session);
			this.$refs.sessionAdjustments.takeCurrentAdjustments(this.session);
			this.$refs.sessionProgress.takeSession(this.session);
			this.$refs.sessionDates.takeSession(this.session);
			this.updateWasModifiedStatus();
		},
		unsetSession() {
			this.unsetSelectedSession();
			this.$refs.sessionAdjustments.unsetAdjustments();
			this.$refs.sessionProgress.unsetSession();
			this.$refs.sessionDates.unsetSession();
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
			if (!this.session) return false;
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
.refresh-button {
	margin-left: auto;
	margin-right: 20px;
}

.session-title {
	text-align: center;
	margin-bottom: 20px;
	position: absolute;
}

.progression-header {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.session-header {
	display: flex;
	flex-direction: row;
	justify-content: center;
}
</style>
