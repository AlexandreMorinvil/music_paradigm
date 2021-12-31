<template>
	<!-- v-if="session.associativeId" -->
	<div
		class="details-container details-container-color details-text"
		:class="{
			'adjusted-container-color': hasAdjustment,
			'experiment-marker-container-color': hasExperimentMaker,
		}"
	>
		<overview-table-session-details-availability-component :session="sessionContent" ref="availability" />
		<overview-table-session-details-marker-component :session="sessionContent" ref="marker" />
		<overview-table-session-details-completions-component :session="sessionContent" ref="adjustments" />
		<overview-table-session-details-adjsutments-component :session="sessionContent" ref="adjustments" />
	</div>
</template>

<script>
import OverviewTableSessionDetailsAdjsutmentsComponent from './overview-table-session-details-adjsutments.component.vue';
import OverviewTableSessionDetailsAvailabilityComponent from './overview-table-session-details-availability.component.vue';
import OverviewTableSessionDetailsCompletionsComponent from './overview-table-session-details-completions.component.vue';
import OverviewTableSessionDetailsMarkerComponent from './overview-table-session-details-marker.component.vue';

export default {
	components: {
		OverviewTableSessionDetailsAvailabilityComponent,
		OverviewTableSessionDetailsCompletionsComponent,
		OverviewTableSessionDetailsAdjsutmentsComponent,
		OverviewTableSessionDetailsMarkerComponent,
	},
	props: {
		index: { type: Number, default: -1 },
		session: {
			type: Object,
			default() {
				return {};
			},
		},
	},
	data() {
		return {
			hasAdjustment: false,
			hasExperimentMaker: false,
		};
	},
	computed: {
		sessionContent() {
			return this.session;
		},
	},
	methods: {
		updateHasAdjustment(value) {
			this.hasAdjustment = value;
		},
		updateHasExperimentMarker(value) {
			this.hasExperimentMaker = value;
		},
	},
	mounted() {
		this.$watch(() => this.$refs.adjustments.hasAdjustment, this.updateHasAdjustment, { immediate: true });
		this.$watch(() => this.$refs.marker.hasExperimentMarker, this.updateHasExperimentMarker, { immediate: true });
	},
};
</script>

<style scoped>
.center-title {
	justify-content: center;
}

.center-align {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
	align-content: center;
	text-align: center;
}

.details-container {
	width: 180px;
	height: auto;
	margin: 10px;
	border-style: solid;
	border-radius: 1px;
	border-width: 4px;
	padding: 5px;
}

.details-container-color {
	background-color: rgb(45, 45, 145);
	border-color: rgb(50, 50, 150);
	box-shadow: 5px 5px 5px rgb(15, 15, 15);
}

.experiment-marker-container-color {
	background-color: rgb(0, 145, 160);
	border-color: rgb(0, 150, 165);
}

.adjusted-container-color {
	background-color: rgb(170, 110, 0);
	border-color: rgb(165, 105, 0);
}

.details-text {
	font-size: 0.6em;
}
</style>
