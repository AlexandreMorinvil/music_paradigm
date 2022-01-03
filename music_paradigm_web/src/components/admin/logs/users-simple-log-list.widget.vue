<template>
	<div class="board-position widget-table-context" :class="isDownloading && 'downloading-filter'">
		<code-editor-component v-if="hasSelectedLog" :readOnly="true" ref="codeEditor" />
		<loader-circular-component v-if="isLoadingUserSimpleLogList" class="loader" />
		<table v-else class="widget-table">
			<thead>
				<tr v-if="hasElements" class="logtype-header">
					<th colspan="9">
						<span>
							<span> SIMPLE LOGS ({{ totalThatWillBeKept }}{{ totalNumberElements }})</span>
							<span v-if="isDownloading" class="generating-message include-white-space"> ...GENERATING LOG FILE... </span>
							<span v-if="isSelectionModeActivated" class="generating-message include-white-space"> - Select the logs to keep</span>
							<span v-if="isExclusionModeActivated" class="generating-message include-white-space"> - Select the logs to exclude</span>
						</span>
						<button class="widget-button small blue right-align" v-on:click="handleCsvDownload">Download CSV</button>
						<button class="widget-button small turquoise right-align" v-on:click="handleJsonDownload">Download JSON</button>
						<button class="widget-button small green right-align" v-on:click="toggleSelectionMode">{{ selectionModeButtonText }}</button>
						<button class="widget-button small orange right-align" v-on:click="toggleExclusionMode">{{ exclusionModeButtonText }}</button>
						<button class="widget-button small blue right-align" v-on:click="handleRefresh">{{ refreshButtonText }}</button>
					</th>
				</tr>
				<tr v-else class="logtype-header">
					<th>No SIMPLE LOGS corresponding</th>
				</tr>
				<tr v-if="hasElements" class="log-identifier-header include-white-space">
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

			<tbody v-if="hasElements" class="include-white-space">
				<tr
					v-for="(logSummary, index) in logSummaryList"
					:key="logSummary._id"
					v-on:click="handleLogClick(logSummary._id)"
					:class="{
						selected: selectedLogIds.includes(logSummary._id) || logSummary._id == selectedLogId,
						wrong: excludedLogIds.includes(logSummary._id),
					}"
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

import CodeEditorComponent from '@/components/admin/TextEditor.vue';
import LoaderCircularComponent from '@/components/visual-helpers/loader-circular.component.vue';

export default {
	components: {
		LoaderCircularComponent,
		CodeEditorComponent,
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
		...mapGetters('logs', ['isLoadingUserSimpleLogList', 'userSimpleLogList', 'isDownloadingLogs', 'selectedUserSimpleLog']),
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
			return this.isSelectionModeActivated ? 'Cancel' : 'Selection';
		},
		exclusionModeButtonText() {
			return this.isExclusionModeActivated ? 'Cancel' : 'Exclusion';
		},
		refreshButtonText() {
			return this.hasSelectedLog ? 'Unselect Log' : 'Refresh';
		},
		selectedLogId() {
			return this.selectedUserSimpleLog._id || null;
		},
		hasSelectedLog() {
			return Boolean(this.selectedLogId);
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
		...mapActions('logs', [
			'getSpecificUserSimpleLog',
			'getUserSimpleLogSummaryList',
			'clearUserSimpleLogSummaryList',
			'clearSelectedUserSimpleLog',
			'downloadUserSimpleLogCSV',
			'downloadUserSimpleLogJson',
		]),
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
			} else this.selectLog(logId);
		},
		handleRefresh() {
			if (this.hasSelectedLog) this.clearSelectedUserSimpleLog();
			else this.refresh();
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
		selectLog(logId) {
			this.getSpecificUserSimpleLog(logId).then(() => {
				// eslint-disable-next-line no-unused-vars
				const { _id, ...relevantContent } = this.selectedUserSimpleLog;
				const formatedContent = JSON.stringify(relevantContent, null, '\t');
				this.$refs.codeEditor.setValue(formatedContent);
				this.$refs.codeEditor.setFullScreenMode();
			});
		},
		unselectLog() {
			this.clearSelectedUserSimpleLog();
		},
		cleanUp() {
			this.clearUserSimpleLogSummaryList();
			this.clearSelectedUserSimpleLog();
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
	beforeDestroy() {
		this.cleanUp();
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

.include-white-space {
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
	width: 130px;
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
