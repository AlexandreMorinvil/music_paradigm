<template>
	<admin-page-content-frame title="Curriculum">
		<widget-content-frame title="Reviewing Tool">
			<template>
				<curriculums-viewer />
			</template>
		</widget-content-frame>

		<widget-content-frame title="Editor Tool">
			<template>
				<curriculums-editor-widget />
			</template>
		</widget-content-frame>

		<widget-content-frame title="Overview Table">
			<template>
				<curriculums-table />
			</template>
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import CurriculumsEditorWidget from '@/components/admin/curriculums/widget-editor/curriculums-editor.widget.vue';
import CurriculumsTable from '@/components/admin/curriculums/CurriculumsTableWidget.vue';
import CurriculumsViewer from '@/components/admin/curriculums/CurriculumsViewerWidget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		CurriculumsViewer: CurriculumsViewer,
		CurriculumsEditorWidget,
		CurriculumsTable: CurriculumsTable,
	},
};
</script>

<style scoped></style>
