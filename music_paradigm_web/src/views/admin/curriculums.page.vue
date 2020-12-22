<template>
	<admin-page-content-frame title="Curriculum">
		<widget-context title="Reviewing Tool">
			<template>
				<curriculums-viewer />
			</template>
		</widget-context>

		<widget-context title="Editor Tool">
			<template>
				<curriculums-editor />
			</template>
		</widget-context>

		<widget-context title="Overview Table">
			<template>
				<curriculums-table />
			</template>
		</widget-context>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import CurriculumsEditor from '@/components/admin/curriculums/CurriculumsEditorWidget.vue';
import CurriculumsTable from '@/components/admin/curriculums/CurriculumsTableWidget.vue';
import CurriculumsViewer from '@/components/admin/curriculums/CurriculumsViewerWidget.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContext: WidgetContext,
		CurriculumsViewer: CurriculumsViewer,
		CurriculumsEditor: CurriculumsEditor,
		CurriculumsTable: CurriculumsTable,
	},
};
</script>

<style scoped></style>
