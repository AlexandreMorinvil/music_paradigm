<template>
	<div class="englobing-box">
		<div class="table-context">
			<div class="table-inside-context content-flex">
				<overview-table-session
					v-for="(session, index) in progressionHistory"
					:key="index"
					:session="session"
					:index="Number(index)"
					v-on:start-session="startSession"
					v-on:click="selectSession(index)"
					class="session-button"
				/>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import OverviewTableSession from '@/components/user/home/overview-table-session.component.vue';

export default {
	props: {
		overWrittingProgressionHistory: {
			default() {
				return null;
			},
		},
	},
	components: {
		OverviewTableSession,
	},
	computed: {
		...mapGetters('account', ['progressionSummary']),
		progressionHistory() {
			return this.overWrittingProgressionHistory || this.progressionSummary;
		},
		isRealUser() {
			return !this.overWrittingProgressionHistory;
		},
	},
	methods: {
		...mapActions('session', ['fetchSpecificExperimentSession']),
		startSession(experimentSession) {
			if (!this.isRealUser) return;
			this.fetchSpecificExperimentSession({
				associativeId: experimentSession.associativeId,
				associativeIdOrdinalNumber: experimentSession.associativeIdOrdinalNumber,
			});
		},
		selectSession(index) {
			this.$emit('selected', index);
		}
	},
};
</script>

<style scoped>
.englobing-box {
	display: grid;
	grid-template-rows: auto;
	color: rgb(230, 230, 230);
}

.table-context {
	padding: 20px;
	background-color: rgb(80, 80, 80);
	border: 5px rgb(75, 75, 75) solid;
	box-shadow: 5px 5px 8px black;
	margin-bottom: 35px;
	z-index: 1;
}

.table-inside-context {
	border: 5px rgb(75, 75, 75) solid;
	background-color: rgb(35, 35, 35);
	box-shadow: 0 0 25px rgb(15, 15, 15) inset;
}

.content-flex {
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

.session-space {
	text-align: center;
}
</style>
