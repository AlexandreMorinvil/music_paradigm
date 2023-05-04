<template>
	<AdminPageContentFrame title="Curriculum">
		<ManageCurriculumWidget />
		<TasksDataWidget />
		<CurriculumsListWidget />
	</AdminPageContentFrame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import CurriculumsListWidget from '@/components/admin/curriculums/widget-curriculums-list/curriculums-list.widget.vue';
import ManageCurriculumWidget from '@/components/admin/curriculums/widget-manage-curriculum/manage-curriculum.widget.vue';
import TasksDataWidget from '@/components/admin/curriculums/widget-task-data/task-data.widget.vue';

export default {
	components: {
		AdminPageContentFrame,
		CurriculumsListWidget,
		ManageCurriculumWidget,
		TasksDataWidget,
	},
};
</script>

<style scoped></style>
