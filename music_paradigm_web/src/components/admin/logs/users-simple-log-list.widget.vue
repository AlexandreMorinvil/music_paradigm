<template>
	<div :id="tableContextDomId" class="board-position widget-table-context" :class="isDownloading && 'downloading-filter'">
		<code-editor-component v-show="hasSelectedLog" :readOnly="true" ref="codeEditor" />
		<loader-circular-component v-if="isLoadingUserSimpleLogList" class="loader" />
		<table v-else class="widget-table">
			<thead>
				<tr v-if="hasElements" class="logtype-header">
					<th colspan="10">
						<span>
							<span> SIMPLE LOGS ({{ totalThatWillBeKept }}{{ totalNumberElements }})</span>
							<span v-if="isFetchingSpecificLog" class="generating-message include-white-space"> ...FORMATING THE LOG... </span>
							<span v-if="isDownloading" class="generating-message include-white-space"> ...GENERATING LOG FILE... </span>
							<span v-if="isSelectionModeActivated" class="generating-message include-white-space"> - Select the logs to keep</span>
							<span v-if="isExclusionModeActivated" class="generating-message include-white-space"> - Select the logs to exclude</span>
						</span>
						<button class="widget-button small blue right-align" v-on:click="handleCsvDownload">Download CSV</button>
						<button class="widget-button small turquoise right-align" v-on:click="handleJsonDownload">Download JSON</button>
						<button class="widget-button small right-align" :class="isSelectionModeActivated ? 'red' : 'green'" v-on:click="toggleSelectionMode">
							{{ selectionModeButtonText }}
						</button>
						<button class="widget-button small right-align" :class="isExclusionModeActivated ? 'red' : 'orange'" v-on:click="toggleExclusionMode">
							{{ exclusionModeButtonText }}
						</button>
						<button class="widget-button small right-align" :class="hasSelectedLog ? 'turquoise' : 'blue'" v-on:click="handleRefresh">
							{{ refreshButtonText }}
						</button>
					</th>
				</tr>
				<tr v-else class="logtype-header">
					<th>
						<span>No SIMPLE LOGS corresponding</span>
						<button class="widget-button small blue right-align" v-on:click="handleRefresh">Refresh</button>
					</th>
				</tr>
				<tr v-if="hasElements" class="log-identifier-header include-white-space">
					<th>#</th>
					<th>username</th>
					<th>tags</th>
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
					:id="logEntryDomIdAbreviation + logSummary._id"
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
					<td>{{ makeLogTagsDisplay(logSummary) }}</td>
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
					completionCountList: null,
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
			tableContextDomId: 'user-simple-logs-list',
			logEntryDomIdAbreviation: 'utl-', // "utl" stands for 'user thorough logs'
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
			isFetchingSpecificLog: false,
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
			return this.logSummaryList.length > 0;
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
			this.clearSelectedUserSimpleLog();
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
			} else if (this.isExclusionModeActivated) {
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
			this.unselectLog();
			this.isExclusionModeActivated = !this.isExclusionModeActivated;
			if (this.isExclusionModeActivated) this.isSelectionModeActivated = false;
			this.emptySpecificLogsRules();
		},
		toggleSelectionMode() {
			if (this.isDownloading) return;
			this.unselectLog();
			this.isSelectionModeActivated = !this.isSelectionModeActivated;
			if (this.isSelectionModeActivated) this.isExclusionModeActivated = false;
			this.emptySpecificLogsRules();
		},
		emptySpecificLogsRules() {
			this.selectedLogIds = [];
			this.excludedLogIds = [];
		},
		selectLog(logId) {
			const codeEditor = this.$refs.codeEditor;
			this.isFetchingSpecificLog = true;
			this.getSpecificUserSimpleLog(logId)
				.then(() => {
					const content = this.selectedUserSimpleLog;
					const formatedContent = JSON.stringify(content, null, '\t');
					codeEditor.setValue(formatedContent);
					codeEditor.setFullScreenMode();
					this.goToLog(logId);
				})
				.finally(() => {
					this.isFetchingSpecificLog = false;
				});
		},
		unselectLog() {
			this.clearSelectedUserSimpleLog();
		},
		cleanUp() {
			this.clearUserSimpleLogSummaryList();
			this.clearSelectedUserSimpleLog();
		},
		goToLog(logId) {
			// The timeout is an adjustment to ensure that the scrolling is done after any
			// DOM change that may happen when the code editor is rendered
			setTimeout(() => {
				const anchorId = this.logEntryDomIdAbreviation + logId;
				const logElement = document.getElementById(anchorId);
				const topPosition = logElement.offsetTop;
				const logList = document.getElementById(this.tableContextDomId);
				logList.scrollTop = topPosition;
			}, 0);
		},
		makeUsernameDisplay(logSummary) {
			return logSummary.username;
		},
		makeLogTagsDisplay(logSummary) {
			const { logTags } = logSummary;
			if (!logTags) return '---';
			if (Array.isArray(logTags)) {
				if (logTags.length > 0) return logTags.join('\n');
				else return '---';
			} else return logTags;
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
			const { isInPrelude, isInConclusion, blockType, blockSubType, index, repetition } = logSummary;
			const preludeSectionDisplay = isInPrelude ? '(prelude)\n' : '';
			const conclusionSectionDisplay = isInConclusion ? '(conclusion)\n' : '';
			const subTypeDisplay = `${blockType}` + (blockSubType ? `/${blockSubType}` : '');
			const indexDisplay = `\nindex: ${index}, rep.: ${repetition}`;
			return preludeSectionDisplay + conclusionSectionDisplay + subTypeDisplay + indexDisplay;
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
