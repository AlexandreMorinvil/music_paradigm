<template>
	<div id="experiments-workshop" class="widget widget-bg">
		<TasksListManagementSection />
		<TasksListSection />
		<TasksManagementSection />
	</div>
</template>

<script>
import '@/styles/widget-template.css';

import TasksListSection from './section-list/tasks-list.section.vue';
import TasksListManagementSection from './section-tasks-list-managment/tasks-list-management.section.vue';
import TasksManagementSection from './section-tasks-management/section-tasks-management.component.vue'

export default {
	components: {
		TasksListSection,
		TasksListManagementSection,
		TasksManagementSection,
	}
};
</script>

<style scoped>

</style>
