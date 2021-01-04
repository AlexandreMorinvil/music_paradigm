<template>
	<admin-page-content-frame title="Users">
		<widget-content-frame title="Reviewer">
			<users-viewer />
		</widget-content-frame>

		<widget-content-frame title="Editior">
			<users-editor-widget />
		</widget-content-frame>

		<widget-content-frame title="Overview Table">
			<users-table />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersEditorWidget from '@/components/admin/users/widget-editor/users-editor.widget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		UsersViewer: UsersViewer,
		UsersEditorWidget,
		UsersTable: UsersTable,
	},
};
</script>

<style scoped></style>
