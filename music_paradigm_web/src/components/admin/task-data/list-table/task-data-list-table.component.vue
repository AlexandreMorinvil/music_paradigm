<template>
	<TemplateTaskDataListTableComponent :listTableId="listTableId" :mustClear="mustClear"
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
		listTableId: {
			type: String,
			default: 'task-management-task-data-list',
		},
		mustClear: {
			type: Boolean,
			default: false,
		},
		taskId: {
			type: String,
			default: null,
		},
	},
	computed: {
		taskDataQueryCriteria() {
			const criteria = taskDataQueryHandler.makeTaskDataQueryCriteriaList({
				experimentIdList: Array(this.taskId).flat(),
			});
			return criteria;
		},
	},
};
</script>

<style scoped></style>
