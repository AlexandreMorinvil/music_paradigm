<template>
	<div class="board-position widget-table-context">
		<loader-circular-component v-if="isLoadingUserSimpleLogList" class="loader" />
		<table v-else class="widget-table log-table">
			<thead v-if="hasElements">
				<tr>
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
			<thead v-else>
				<tr>
					<th>No "simple" log corresponding</th>
				</tr>
			</thead>
			<tbody>
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
			datesOptions: { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' },
		};
	},
	computed: {
		...mapGetters('logs', ['isLoadingUserSimpleLogList', 'userSimpleLogList']),
		isListLoading() {
			return false;
		},
		logSummaryList() {
			return this.userSimpleLogList || [];
		},
		hasElements() {
			return this.logSummaryList.length;
		},
	},
	methods: {
		...mapActions('logs', ['getUserSimpleLogSummaryList', 'clearUserSimpleLogSummaryList']),
		refresh() {
			console.log('Here');
			this.getUserSimpleLogSummaryList(this.rules);
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
.log-table {
	white-space: pre-line;
}

.loader {
	width: 100px;
	height: 100px;
}
</style>
