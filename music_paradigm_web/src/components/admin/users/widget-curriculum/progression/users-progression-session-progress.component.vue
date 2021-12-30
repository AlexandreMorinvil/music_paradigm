<template>
	<div class="widget-table-context progress-table">
		<table class="widget-table">
			<thead v-if="hasLinkedSessions || hasExperimentMarker">
				<tr>
					<th colspan="2">Progress Kept in Memory</th>
				</tr>
			</thead>
			<tbody>
				<tr v-if="hasLinkedSessions">
					<td>Linked Sessions ({{ linkedSessionsCount }})</td>
					<td>
						<div
							v-for="(title, index) in linkedSessionsTitles"
							v-bind:key="index"
							:class="{ 'selected-element-text': title === selectedSessionTitle }"
						>
							{{ title }}
						</div>
					</td>
				</tr>
				<tr v-if="hasExperimentMarker">
					<td>Time Indicated Now</td>
					<td>{{ timeIndicated }}</td>
				</tr>
				<tr v-if="hasExperimentMarker">
					<td>Progress Percentage</td>
					<td>{{ progressPercentage }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			associativeId: null,
			selectedSessionTitle: '',
			experimentMarker: {},
		};
	},
	computed: {
		...mapGetters('users', ['userSelectedExperimentMarkers', 'userSelectedProgressionHistory']),
		hasLinkedSessions() {
			return this.linkedSessionsTitles.length > 1;
		},
		linkedSessionsTitles() {
			const linkedSessions = this.userSelectedProgressionHistory.filter((session) => {
				return session.associativeId == this.associativeId;
			});
			return linkedSessions.map((session) => session.title);
		},
		linkedSessionsCount() {
			return this.linkedSessionsTitles.length;
		},
		hasExperimentMarker() {
			return Boolean(this.experimentMarker.associativeId);
		},
		timeIndicated() {
			const { seconds, minutes, hours, days } = this.parseTimeIndicated(Number(this.experimentMarker.timeIndicated));

			let display = `${minutes}:${seconds}`;
			if (hours > 0 || days > 0) display = `:${hours}:${display}`;
			if (days > 0) display = `:${days}:${display}`;

			return display;
		},
		progressPercentage() {
			const progressRatio = this.experimentMarker.progressRatio;
			if (!progressRatio) return 'Unknown';
			const progressPercentage = (progressRatio * 100).toFixed(1);
			return progressPercentage + '%';
		},
	},
	methods: {
		takeSession(session) {
			this.associativeId = session.associativeId;
			this.selectedSessionTitle = session.title;
			this.experimentMarker = this.userSelectedExperimentMarkers.find((marker) => marker.associativeId == this.associativeId) || {};
		},
		unsetSession() {
			this.associativeId = null;
			this.selectedSessionTitle = '';
			this.experimentMarker = {};
		},
		parseTimeIndicated(milliseconds = 0) {
			const seconds = Math.floor((milliseconds / 1000) % 60);
			const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
			const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
			const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));
			const numberFormattingOptions = { minimumIntegerDigits: 2, useGrouping: false };
			return {
				seconds: seconds.toLocaleString('en-US', numberFormattingOptions),
				minutes: minutes.toLocaleString('en-US', numberFormattingOptions),
				hours: hours.toLocaleString('en-US', numberFormattingOptions),
				days: days.toLocaleString('en-US', numberFormattingOptions),
			};
		},
	},
};
</script>

<style scoped>
.progress-table {
	padding: 25px 25px 0;
}
</style>
