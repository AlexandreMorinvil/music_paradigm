<template>
	<admin-page-content-frame title="Curriculum">
		<widget-content-frame title="Editor">
			<template>
				<curriculums-editor-widget />
			</template>
		</widget-content-frame>

		<CurriculumsListWidget />
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import CurriculumsEditorWidget from '@/components/admin/curriculums/widget-editor/curriculums-editor.widget.vue';
import CurriculumsListWidget from '@/components/admin/curriculums/widget-curriculums-list/curriculums-list.widget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame,
		CurriculumsEditorWidget,
		CurriculumsListWidget,
	},
};
</script>

<style scoped></style>
