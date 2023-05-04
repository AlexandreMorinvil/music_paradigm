<template>
	<TemplateTaskDataListTableComponent :isAdminData="isAdminData" :listTableId="listTableId" :mustClear="mustClear"
		:taskDataQueryCriteria="taskDataQueryCriteria" />
</template>

<script>
import { taskDataQueryHandler } from '@/modules/task-data';

import TemplateTaskDataListTableComponent from './template-task-data-list-table.component.vue';

export default {
	components: {
		TemplateTaskDataListTableComponent,
	},
	props: {
		isAdminData: {
			type: Boolean,
			default: false,
		},
		listTableId: {
			type: String,
			default: 'task-data-list',
		},
		mustClear: {
			type: Boolean,
			default: false,
		},

		// Summary fetching query parameters
		associativeId: {
			type: String,
			default: null,
		},
		completionCount: {
			type: Number,
			default: null,	
		},
		taskId: {
			type: String,
			default: null,
		},
		userId: {
			type: String,
			default: null,
		},
	},
	computed: {
		taskDataQueryCriteria() {
			const criteria = taskDataQueryHandler.makeTaskDataQueryCriteriaList({
				completionCountList: this.completionCount ? Array(this.completionCount).flat() : null,
				curriculumIdList: this.curriculumId ? Array(this.curriculumId).flat() : null,
				experimentIdList: this.taskId ? Array(this.taskId).flat() : null,
				userIdList: this.userId ? Array(this.userId).flat() : null,
				associativeIdList: this.associativeId ? Array(this.associativeId).flat() : null,
			});
			return criteria;
		},
	},
};
</script>

<style scoped></style>
