<template>
	<div class="englobing-box">
		<div class="board-context">
			<div class="table-inside-context content-flex">
				<div
					v-for="(session, index) in progressionHistory"
					:key="index"
					v-on:click="selectSession(session)"
					:class="{ 'highlighted-session': mustHighlight(session) }"
				>
					<overview-table-session-component
						:session="session"
						:index="Number(index)"
						v-on:start-session="startSession"
					/>

					<!-- This slot it used to add information when using this component for the users management page -->
					<slot :session="session" :index="Number(index)"> </slot>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import OverviewTableSessionComponent from '@/components/user/home/overview-table-session.component.vue';

export default {
	props: {
		sessionsList: {
			default() {
				return null;
			},
		},
		sessionToHightlight: {
			default() {
				return null;
			},
		},
	},
	components: {
		OverviewTableSessionComponent,
	},
	computed: {
		...mapGetters('account', ['progressionSummary']),
		progressionHistory() {
			return this.sessionsList || this.progressionSummary;
		},
		isRealUser() {
			return !this.sessionsList;
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
		selectSession(session) {
			this.$emit('sessionSelected', session);
		},
		mustHighlight(session) {
			return (
				!this.isRealUser &&
				this.sessionToHightlight.associativeId === session.associativeId &&
				this.sessionToHightlight.associativeIdOrdinalNumber === session.associativeIdOrdinalNumber
			);
		},
	},
};
</script>

<style scoped>
.englobing-box {
	display: grid;
	grid-template-rows: auto;
	color: rgb(230, 230, 230);
}

.board-context {
	padding: 20px;
	background-color: rgb(80, 80, 80);
	border: 5px rgb(75, 75, 75) solid;
	box-shadow: 5px 5px 8px black;
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

.highlighted-session {
	background-color: rgba(100, 200, 50, 0.25);
	box-shadow: 0 0px 10px rgba(100, 200, 50, 0.5);
	border-radius: 10px;
}

.highlighted-session > * {
	box-shadow: none !important;
}
</style>
