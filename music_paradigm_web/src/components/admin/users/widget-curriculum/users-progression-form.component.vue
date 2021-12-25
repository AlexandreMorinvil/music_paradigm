<template>
	<div class="form-grid" @submit.prevent>
		<h3>Progression :</h3>
		<progression-dates-adjustment-component ref="progressionDates" />
		<overview-table-component :overWrittingProgressionHistory="history" v-on:sessionSelected="setSession" />
		<div class="inner-inner-widget" v-show="hasSelectedSession">
			<h4> {{ sessionTitle }} </h4>
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
		...mapGetters('users', ['userSelectedId', 'userSelectedProgressionHistory']),
		history() {
			return this.userSelectedProgressionHistory;
		},
		hasSelectedSession() {
			return Boolean(this.session.associativeId);
		},
		sessionTitle() {
			return this.session ? this.session.title : '';
		}
	},
	methods: {
		bundleProgressionAdjustments() {
			return {
				...this.$refs.progressionDates.bundleAdjustments(),
			};
		},
		updateWasModifiedStatus() {
			const wasStartTimeAdjustmentModified = this.$refs.progressionDates.wasAdjustmentModified;
			const wasProgressionHistoryAdjustmentModified = this.$refs.sessionAdjustments.wasAdjustmentModified;
			this.wasProgressionModified = wasStartTimeAdjustmentModified || wasProgressionHistoryAdjustmentModified;
		},
		unsetSession() {
			this.session = {};
			this.$refs.sessionAdjustments.unsetAdjustments();
		},
		setSession(session) {
			this.session = session;
			this.$refs.sessionAdjustments.takeCurrentAdjustments(session);
		},
		revert() {
			this.$refs.sessionAdjustments.revert();
			this.$refs.progressionDates.revert();
		}
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
				this.unsetSession();
			},
		},
	},
};
</script>

<style scoped></style>
