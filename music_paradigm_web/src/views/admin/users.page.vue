<template>
	<admin-page-content-frame title="Users">
		<widget-content-frame-component title="Reviewer">
			<users-viewer />
		</widget-content-frame-component>

		<widget-content-frame-component title="Editior">
			<users-editor-widget />
		</widget-content-frame-component>

		<widget-content-frame-component title="Curriculum">
			<users-curriculum-widget />
		</widget-content-frame-component>

		<widget-content-frame-component title="Overview Table">
			<users-table />
		</widget-content-frame-component>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersCurriculumWidget from '@/components/admin/users/widget-curriculum/users-curriculum.widget.vue';
import UsersEditorWidget from '@/components/admin/users/widget-editor/users-editor.widget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrameComponent,
		UsersViewer: UsersViewer,
		UsersCurriculumWidget,
		UsersEditorWidget,
		UsersTable: UsersTable,
	},
};
</script>

<style scoped></style>
