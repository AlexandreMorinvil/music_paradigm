<template>
	<!-- v-if="session.associativeId" -->
	<div
		class="details-container details-container-color details-text"
		:class="{
			'adjusted-container-color': hasAdjustment,
			'experiment-marker-container-color': hasExperimentMaker,
		}"
	>
		<div class="associative-id-contanier-box"><b>Ass. ID:</b> {{ completeAssociativeId }}</div>
		<OverviewBoardSessionDetailsAvailabilityComponent :session="sessionContent" ref="availability" />
		<OverviewBoardSessionDetailsMarkerComponent :session="sessionContent" ref="marker" />
		<OverviewBoardSessionDetailsCompletionsComponent :session="sessionContent" ref="adjustments" />
		<OverviewBoardSessionDetailsAdjsutmentsComponent :session="sessionContent" ref="adjustments" />
	</div>
</template>

<script>
import '@/styles/color-palette.css';

import OverviewBoardSessionDetailsAdjsutmentsComponent from './overview-board-session-details-adjsutments.component.vue';
import OverviewBoardSessionDetailsAvailabilityComponent from './overview-board-session-details-availability.component.vue';
import OverviewBoardSessionDetailsCompletionsComponent from './overview-board-session-details-completions.component.vue';
import OverviewBoardSessionDetailsMarkerComponent from './overview-board-session-details-marker.component.vue';

export default {
	components: {
		OverviewBoardSessionDetailsAvailabilityComponent,
		OverviewBoardSessionDetailsCompletionsComponent,
		OverviewBoardSessionDetailsAdjsutmentsComponent,
		OverviewBoardSessionDetailsMarkerComponent,
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
		completeAssociativeId() {
			return `${this.session.associativeId} / ${this.session.associativeIdOrdinalNumber}`;
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
	position: relative;
	width: 220px;
	height: auto;
	margin: 10px;
	border-style: solid;
	border-radius: 1px;
	border-width: 4px;
	padding: 5px;
}

.associative-id-contanier-box {
	position: absolute;
	display: inline;
	padding: 1px;
	width: auto;
	top: -22px;
	left: -10px;
	border-width: 3px;
	border-style: solid;
	background-color: var(--color-green-board-tag-background);
	border-color: var(--color-green-board-tag-border);
	color: rgba(255, 255, 255, 0.85);
	box-shadow: 5px 5px 3px rgba(0, 0, 0, 0.1);
}

.details-container-color {
	background-color: var(--color-blue-board-tag-background);
	border-color: var(--color-blue-board-tag-border);
	box-shadow: 5px 5px 5px rgb(15, 15, 15);
}

.experiment-marker-container-color {
	background-color: var(--color-turquoise-board-tag-background);
	border-color: var(--color-turquoise-board-tag-border);
}

.adjusted-container-color {
	background-color: var(--color-orange-board-tag-background);
	border-color: var(--color-orange-board-tag-border);
}

.details-text {
	font-size: 0.6em;
}
</style>
