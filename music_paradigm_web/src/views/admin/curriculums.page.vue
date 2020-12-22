<template>
	<admin-page-content-frame title="Curriculum">
		<widget-content-frame title="Reviewing Tool">
			<template>
				<curriculums-viewer />
			</template>
		</widget-content-frame>

		<widget-content-frame title="Editor Tool">
			<template>
				<curriculums-editor />
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
import CurriculumsEditor from '@/components/admin/curriculums/CurriculumsEditorWidget.vue';
import CurriculumsTable from '@/components/admin/curriculums/CurriculumsTableWidget.vue';
import CurriculumsViewer from '@/components/admin/curriculums/CurriculumsViewerWidget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		CurriculumsViewer: CurriculumsViewer,
		CurriculumsEditor: CurriculumsEditor,
		CurriculumsTable: CurriculumsTable,
	},
};
</script>

<style scoped></style>
