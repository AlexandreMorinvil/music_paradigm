<template>
	<div class="board-position widget-table-context" :class="isDownloading && 'downloading-filter'">
		<loader-circular-component v-if="isLoadingUserSimpleLogList" class="loader" />
		<table v-else class="widget-table">
			<thead>
				<tr v-if="hasElements" class="logtype-header">
					<th colspan="9">
						<span
							>SIMPLE LOGS ({{ totalThatWillBeKept }}{{ totalNumberElements }})
							<span v-if="isDownloading" class="generating-message">...GENERATING LOG FILE...</span>
							<span v-if="isSelectionModeActivated" class="generating-message">Select the logs wanted</span>
							<span v-if="isExclusionModeActivated" class="generating-message">Select log to exclude it</span>
						</span>
						<button class="widget-button small green right-align" v-on:click="handleCsvDownload">Download CSV</button>
						<button class="widget-button small turquoise right-align" v-on:click="handleJsonDownload">Download JSON</button>
						<button class="widget-button small blue right-align" v-on:click="toggleSelectionMode">{{ selectionModeButtonText }}</button>
						<button class="widget-button small orange right-align" v-on:click="toggleExclusionMode">{{ exclusionModeButtonText }}</button>
					</th>
				</tr>
				<tr v-else class="logtype-header">
					<th>No SIMPLE LOGS corresponding</th>
				</tr>
				<tr v-if="hasElements" class="log-identifier-header include-backlines">
					<th>#</th>
					<th>username</th>
					<th>curriculum</th>
					<th>Associative ID</th>
					<th>Experiment</th>
					<th>Log Label</th>
					<th>State</th>
					<th style=": ">Start |<br />Completion</th>
					<th>Date</th>
				</tr>
			</thead>

			<tbody v-if="hasElements" class="include-backlines">
				<tr
					v-for="(logSummary, index) in logSummaryList"
					:key="logSummary._id"
					v-on:click="handleLogClick(logSummary._id)"
					:class="{ selected: selectedLogIds.includes(logSummary._id), wrong: excludedLogIds.includes(logSummary._id) }"
				>
					<td>{{ index + 1 }}</td>
					<td>{{ makeUsernameDisplay(logSummary) }}</td>
					<td>{{ makeCurriculumDisplay(logSummary) }}</td>
					<td>{{ makeAssociativeIdDisplay(logSummary) }}</td>
					<td>{{ makeExperimentDisplay(logSummary) }}</td>
					<td>{{ makeLogLabelDisplay(logSummary) }}</td>
					<td>{{ makeStateDisplay(logSummary) }}</td>
					<td>{{ makeStartCompletionCountDisplay(logSummary) }}</td>
					<td>{{ makeDateDisplay(logSummary) }}</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import { mapActions, mapGetters } from 'vuex';

import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	components: {
		LoaderCircularComponent,
	},
	props: {
		mustAutoRefresh: {
			type: Boolean,
			default() {
				return true;
			},
		},
		rules: {
			type: Object,
			default() {
				return {
					userIdList: null,
					progressionIdList: null,
					associativeIdList: null,
					logLabelList: null,
					curriculumIdList: null,
					experimentIdList: null,
					minCompletionCount: null,
					maxCompletionCount: null,
					minDate: null,
					maxDate: null,
				};
			},
		},
	},
	data() {
		return {
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
			isSelectionModeActivated: false,
			isExclusionModeActivated: false,
			selectedLogIds: [],
			excludedLogIds: [],
		};
	},
	computed: {
		...mapGetters('logs', ['isLoadingUserSimpleLogList', 'userSimpleLogList', 'isDownloadingLogs']),
		isListLoading() {
			return this.isLoadingUserSimpleLogList;
		},
		logSummaryList() {
			return this.userSimpleLogList || [];
		},
		totalThatWillBeKept() {
			const selectedCount = this.selectedLogIds.length;
			if (selectedCount > 0) return `${selectedCount}/`;
			const excludedCount = this.excludedLogIds.length;
			if (excludedCount > 0) return `${this.totalNumberElements - excludedCount}/`;
			return '';
		},
		totalNumberElements() {
			return this.userSimpleLogList.length;
		},
		hasElements() {
			return this.logSummaryList.length;
		},
		isDownloading() {
			return this.isDownloadingLogs;
		},
		selectionModeButtonText() {
			return this.isSelectionModeActivated ? 'Cancel' : 'Select Specific';
		},
		exclusionModeButtonText() {
			return this.isExclusionModeActivated ? 'Cancel' : 'Select Exclusions';
		},
		completeRules() {
			const rules = {};
			Object.assign(rules, this.rules);
			Object.assign(rules, { selectedLogIds: this.selectedLogIds });
			Object.assign(rules, { excludedLogIds: this.excludedLogIds });
			return rules;
		},
	},
	methods: {
		...mapActions('logs', ['getUserSimpleLogSummaryList', 'clearUserSimpleLogSummaryList', 'downloadUserSimpleLogCSV', 'downloadUserSimpleLogJson']),
		refresh() {
			this.getUserSimpleLogSummaryList(this.rules);
			this.isSelectionModeActivated = false;
			this.isExclusionModeActivated = false;
			this.emptySpecificLogsRules();
		},
		handleCsvDownload() {
			if (this.isDownloading) return;
			this.downloadUserSimpleLogCSV(this.completeRules);
		},
		handleJsonDownload() {
			if (this.isDownloading) return;
			this.downloadUserSimpleLogJson(this.completeRules);
		},
		handleLogClick(logId) {
			if (this.isDownloading) return;
			if (this.isSelectionModeActivated) {
				const index = this.selectedLogIds.indexOf(logId);
				index === -1 ? this.selectedLogIds.push(logId) : this.selectedLogIds.splice(index, 1);
			}
			if (this.isExclusionModeActivated) {
				const index = this.excludedLogIds.indexOf(logId);
				index === -1 ? this.excludedLogIds.push(logId) : this.excludedLogIds.splice(index, 1);
			} else {
				console.log('select specific log');
			}
		},
		toggleExclusionMode() {
			if (this.isDownloading) return;
			this.isExclusionModeActivated = !this.isExclusionModeActivated;
			if (this.isExclusionModeActivated) this.isSelectionModeActivated = false;
			this.emptySpecificLogsRules();
		},
		toggleSelectionMode() {
			if (this.isDownloading) return;
			this.isSelectionModeActivated = !this.isSelectionModeActivated;
			if (this.isSelectionModeActivated) this.isExclusionModeActivated = false;
			this.emptySpecificLogsRules();
		},
		emptySpecificLogsRules() {
			this.selectedLogIds = [];
			this.excludedLogIds = [];
		},
		makeUsernameDisplay(logSummary) {
			return logSummary.username;
		},
		makeCurriculumDisplay(logSummary) {
			return logSummary.curriculumTitle;
		},
		makeAssociativeIdDisplay(logSummary) {
			const { associativeId, associativeIdOrdinalNumber } = logSummary;
			return `${associativeId} / ${associativeIdOrdinalNumber}`;
		},
		makeExperimentDisplay(logSummary) {
			const { experimentGroup, experimentName, experimentVersion } = logSummary;
			return `${experimentGroup}/\n${experimentName} (v${experimentVersion})`;
		},
		makeLogLabelDisplay(logSummary) {
			return logSummary.logLabel;
		},
		makeStateDisplay(logSummary) {
			const { isInPrelude, blockType, blockSubType, index, repetition } = logSummary;
			const sectionDisplay = isInPrelude ? '(prelude)\n' : '';
			const subTypeDisplay = `${blockType}` + (blockSubType ? `/${blockSubType}` : '');
			const indexDisplay = `\nindex: ${index}, rep.: ${repetition}`;
			return sectionDisplay + subTypeDisplay + indexDisplay;
		},
		makeStartCompletionCountDisplay(logSummary) {
			const { startCount, completionCount } = logSummary;
			return `${startCount} | ${completionCount}`;
		},
		makeDateDisplay(logSummary) {
			return new Date(logSummary.createdAt).toLocaleDateString(undefined, this.datesOptions);
		},
	},
	beforeMount() {
		if (this.mustAutoRefresh) this.refresh();
	},
	watch: {
		rules: {
			deep: true,
			handler: function () {
				if (this.mustAutoRefresh) this.refresh();
			},
		},
	},
};
</script>

<style scoped>
.widget-table-context {
	position: relative;
}

.generating-message {
	color: yellow;
}

.downloading-filter {
	filter: brightness(50%);
	cursor: default;
}

.include-backlines {
	white-space: pre-line;
}

.loader {
	width: 100px;
	height: 100px;
}

.right-align {
	float: right;
}

.widget-button {
	width: 150px;
	border-radius: 0;
	margin: 0;
}

.logtype-header {
	position: sticky;
	height: 50px;
	top: 0;
}

.log-identifier-header {
	position: sticky;
	top: 49px;
}
</style>
