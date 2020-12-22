<template>
	<admin-page-content-frame title="Users">
		<widget-context title="Reviewing Tool">
			<template>
				<users-viewer />
			</template>
		</widget-context>

		<widget-context title="Editior Tool">
			<template>
				<users-editor />
			</template>
		</widget-context>

		<widget-context title="Overview Table">
			<template>
				<users-table />
			</template>
		</widget-context>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersEditor from '@/components/admin/users/UsersEditorWidget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContext: WidgetContext,
		UsersViewer: UsersViewer,
		UsersEditor: UsersEditor,
		UsersTable: UsersTable,
	},
};
</script>

<style scoped></style>
