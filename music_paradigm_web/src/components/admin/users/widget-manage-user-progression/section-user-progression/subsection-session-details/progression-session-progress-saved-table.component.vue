<template>
	<div class="widget-table-context">
		<table class="widget-table">
			<thead>
				<tr>
					<th :colspan="hasTaskStateMarker ? 3 : 2">Task progression</th>
				</tr>
			</thead>
			<tbody>
				<tr v-show="hasLinkedSessions">
					<td>Linked Sessions ({{ linkedSessionsCount }})</td>
					<td>
						<div v-for="(session, index) in linkedSessions" v-bind:key="index" :class="{
							'selected-element-text': isSelectedSession(session)
						}">
							<span class="clickable" v-on:click="() => selectSession(session)"> {{ session.title }} </span>
						</div>
					</td>
					<td v-if="hasTaskStateMarker" />
				</tr>
				<tr v-show="hasTaskStateMarker">
					<td>Task Completion Percentage</td>
					<td>
						<TemplateFieldOutputComponent :value="progressRatio" :formatValueFunction="formatPercentage" />
					</td>
					<td class="button-cell">
						<ButtonResetSessionTaskProgressionComponent :isSmall="true" />
					</td>
				</tr>
				<tr v-show="hasTaskStateMarker">
					<td>Time Saved on the Timer</td>
					<td>
						<TemplateFieldOutputComponent :value="timeIndicated" :formatValueFunction="formatTimerTime" />
					</td>
					<td class="button-cell">
						<ButtonResetSessionTimerComponent :isSmall="true" />
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import { durationHandler } from '@/_helpers';
import { ProgressionSessionIdentifier } from '@/modules/progressions';
import TemplateFieldOutputComponent from '@/components/admin/template/template-field-output.component.vue';

import ButtonResetSessionTimerComponent from '../buttons/button-reset-session-timer.component.vue';
import ButtonResetSessionTaskProgressionComponent from '../buttons/button-reset-session-task-progression.component.vue';

export default {
	components: {
		ButtonResetSessionTimerComponent,
		ButtonResetSessionTaskProgressionComponent,
		TemplateFieldOutputComponent,
	},
	computed: {
		...mapGetters('managementUsers/progressions/sessions', [
			'hasProgressionSessionsLinkedForSession',
			'progressionSessionsLinkedForSession',
		]),
		...mapGetters('managementUsers/progressions/sessions/selection', [
			'hasProgressionSessionSelectionTaskStateMarker',
			'progressionSessionSelection',
			'progressionSessionSelectionTaskStateMarkerTimeIndicated',
			'progressionSessionSelectionTaskStateMarkerProgressRatio',
		]),
		associativeIdOrdinalNumber() {
			return this.progressionSessionSelectionAssociativeIdOrdinalNumber;
		},
		timeIndicated() {
			return this.progressionSessionSelectionTaskStateMarkerTimeIndicated;
		},
		progressRatio() {
			return this.progressionSessionSelectionTaskStateMarkerProgressRatio;
		},
		hasLinkedSessions() {
			return this.hasProgressionSessionsLinkedForSession(this.progressionSessionSelection);
		},
		linkedSessions() {
			return this.progressionSessionsLinkedForSession(this.progressionSessionSelection);
		},
		linkedSessionsCount() {
			return this.linkedSessions.length;
		},
		hasTaskStateMarker() {
			return this.hasProgressionSessionSelectionTaskStateMarker;
		},

	},
	methods: {
		...mapActions('managementUsers/progressions/sessions', ['setSelectedProgressionSession']),
		formatTimerTime(value) {
			return durationHandler.formatTimerTime(value);
		},
		formatPercentage(decimalValue) {
			if (!decimalValue) return null;
			const percentage = (decimalValue * 100).toFixed(1);
			return percentage + '%';
		},
		isSelectedSession(session) {
			return ProgressionSessionIdentifier.isCorresponding(session, this.progressionSessionSelection);
		},
		selectSession(session) {
			this.setSelectedProgressionSession(session);
		},
	},
};
</script>

<style scoped>
button {
	width: 150px;
}

table {
	table-layout: fixed;
}

.button-cell {
	width: 175px;
}

.clickable {
	cursor: pointer;
}
</style>
