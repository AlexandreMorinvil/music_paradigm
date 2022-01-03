<template>
	<div class="widget-table-context progress-table">
		<table class="widget-table">
			<thead v-show="hasLinkedSessions || hasExperimentMarker">
				<tr>
					<th colspan="3">Progress Kept in Memory</th>
				</tr>
			</thead>
			<tbody>
				<tr v-show="hasLinkedSessions">
					<td>Linked Sessions ({{ linkedSessionsCount }})</td>
					<td>
						<div
							v-for="(session, index) in linkedSessions"
							v-bind:key="index"
							:class="{ 'selected-element-text': session.associativeIdOrdinalNumber === associativeIdOrdinalNumber }"
						>
							{{ session.title }}
						</div>
					</td>
					<td v-if="hasExperimentMarker" />
				</tr>
				<tr v-show="hasExperimentMarker">
					<td>Progress Percentage</td>
					<td>{{ progressPercentageDisplay }}</td>
					<td class="button-case">
						<button v-on:click="handleForgetProgress()" class="widget-button button small red">Restart Session</button>
					</td>
				</tr>
				<tr v-show="hasExperimentMarker">
					<td>Time Indicated Now</td>
					<td>{{ timeIndicatedDisplay }}</td>
					<td class="button-case">
						<button v-on:click="handleTimeReset()" class="widget-button button small red">Reset Time</button>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {
			associativeId: null,
			associativeIdOrdinalNumber: 0,
			experimentMarker: {},
			timeIndicated: null,
			progressRatio: 0,
		};
	},
	computed: {
		...mapGetters('users/progressions', ['userSelectedExperimentMarkers', 'userSelectedProgressionHistory']),
		hasLinkedSessions() {
			return this.linkedSessionsCount > 1;
		},
		linkedSessions() {
			return this.userSelectedProgressionHistory.filter((session) => {
				return session.associativeId == this.associativeId;
			});
		},
		linkedSessionsCount() {
			return this.linkedSessions.length;
		},
		hasExperimentMarker() {
			return Boolean(this.experimentMarker.associativeId);
		},
		timeIndicatedDisplay() {
			const { seconds, minutes, hours, days } = this.parseTimeIndicated(Number(this.timeIndicated));

			if (seconds <= 0 && seconds <= 0 && seconds <= 0 && seconds <= 0) return 'Time reset';

			let display = `${minutes}:${seconds}`;
			if (hours > 0 || days > 0) display = `:${hours}:${display}`;
			if (days > 0) display = `:${days}:${display}`;

			return display;
		},
		progressPercentageDisplay() {
			const progressRatio = this.progressRatio;
			if (!progressRatio) return 'Unknown';
			const progressPercentage = (progressRatio * 100).toFixed(1);
			return progressPercentage + '%';
		},
	},
	methods: {
		...mapActions('users/progressions', ['resetSessionTimeIndicated', 'resetSessionProgressKept']),
		takeSession(session) {
			this.associativeId = session.associativeId;
			this.associativeIdOrdinalNumber = session.associativeIdOrdinalNumber;
			this.fetchMakersDetails();
		},
		unsetSession() {
			this.associativeId = null;
			this.associativeIdOrdinalNumber = 0;
			this.experimentMarker = {};
			this.timeIndicated = null;
			this.progressRatio = 0;
		},
		fetchMakersDetails() {
			this.experimentMarker = this.userSelectedExperimentMarkers.find((marker) => marker.associativeId == this.associativeId) || {};
			this.timeIndicated = this.experimentMarker.timeIndicated;
			this.progressRatio = this.experimentMarker.progressRatio;
		},
		handleTimeReset() {
			const answer = window.confirm('Are you sure you want to reset the time for this session?\nThis cannot be cancelled.');
			if (answer) this.resetSessionTimeIndicated(this.associativeId);
		},
		handleForgetProgress() {
			let answer = window.confirm('Are you - really - sure you want to restart the progress for this session?\nThis cannot be cancelled.');
			if (!answer) return;

			if (this.hasLinkedSessions) {
				const linkedSessionsTitles = this.linkedSessions
					.map((session) => {
						return '   - ' + session.title;
					})
					.join('\n');
				answer = window.confirm(`This will affect the sessions:\n${linkedSessionsTitles}This cannot be cancelled.\n\nAre you still sure?`);
			}
			if (answer) answer = window.confirm('One last time, are you really sure?');
			if (answer) this.resetSessionProgressKept(this.associativeId);
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
button {
	width: 125px;
}

.button-case {
	width: 150px;
}

.progress-table {
	padding: 25px 25px 0;
}
</style>
