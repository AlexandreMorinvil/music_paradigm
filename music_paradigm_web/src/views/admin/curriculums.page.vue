<template>
	<AdminPageContentFrame title="Curriculum">
		<ManageCurriculumWidget />
		<CurriculumsListWidget />
	</AdminPageContentFrame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import ManageCurriculumWidget from '@/components/admin/curriculums/widget-manage-curriculum/manage-curriculum.widget.vue';
import CurriculumsListWidget from '@/components/admin/curriculums/widget-curriculums-list/curriculums-list.widget.vue';

export default {
	components: {
		AdminPageContentFrame,
		CurriculumsListWidget,
		ManageCurriculumWidget,
	},
};
</script>

<style scoped></style>
