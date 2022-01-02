<template>
	<div class="board-position widget-table-context" :class="isDownloading && 'downloading-filter'">
		<loader-circular-component v-if="isLoadingUserSimpleLogList" class="loader" />
		<table v-else class="widget-table log-table">
			<thead>
				<tr v-if="hasElements" class="logtype-header">
					<th colspan="9">
						<span
							>SIMPLE LOGS ({{ totalNumberElements }}) <span v-if="isDownloading" class="generating-message">...GENERATING LOG FILE...</span></span
						>
						<button class="widget-button small green right-align" v-on:click="handleCsvDownload">Download CSV</button>
						<button class="widget-button small turquoise right-align" v-on:click="handleJsonDownload">Download JSON</button>
						<button class="widget-button small orange right-align" v-on:click="handleExclusionsSelection">Select Exclusions</button>
					</th>
				</tr>
				<tr v-else class="logtype-header">
					<th>No SIMPLE LOGS corresponding</th>
				</tr>
				<tr v-if="hasElements" class="log-identifier-header">
					<th>#</th>
					<th>username</th>
					<th>curriculum</th>
					<th>Associative ID</th>
					<th>Experiment</th>
					<th>Log Label</th>
					<th>State</th>
					<th>Start |<br />Completion</th>
					<th>Date</th>
				</tr>
			</thead>

			<tbody v-if="hasElements">
				<tr v-for="(logSummary, index) in logSummaryList" :key="logSummary._id">
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
			areExclusionsActivated: false,
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
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
		totalNumberElements() {
			return this.userSimpleLogList.length;
		},
		hasElements() {
			return this.logSummaryList.length;
		},
		isDownloading() {
			return this.isDownloadingLogs;
		},
	},
	methods: {
		...mapActions('logs', ['getUserSimpleLogSummaryList', 'clearUserSimpleLogSummaryList', 'downloadUserSimpleLogCSV', 'downloadUserSimpleLogJson']),
		refresh() {
			if (this.isDownloading) return;
			this.getUserSimpleLogSummaryList(this.rules);
		},
		handleCsvDownload() {
			if (this.isDownloading) return;
			this.downloadUserSimpleLogCSV(this.rules);
		},
		handleJsonDownload() {
			if (this.isDownloading) return;
			this.downloadUserSimpleLogJson(this.rules);
		},
		handleExclusionsSelection() {
			if (this.isDownloading) return;
			console.log('Exclusions selection');
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

.log-table {
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
