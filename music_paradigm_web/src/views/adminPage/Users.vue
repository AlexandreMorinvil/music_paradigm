<template>
	<admin-page-context title="Users">
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
	</admin-page-context>
</template>

<script>
import AdminPageContext from '@/components/admin/AdminPageContext.vue';
import UsersEditor from '@/components/admin/users/UsersEditorWidget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContext from '@/components/admin/WidgetContext.vue';

export default {
	components: {
		AdminPageContext: AdminPageContext,
		WidgetContext: WidgetContext,
		UsersViewer: UsersViewer,
		UsersEditor: UsersEditor,
		UsersTable: UsersTable,
	},
};
</script>

<style scoped></style>
