<template>
	<admin-page-content-frame title="Users">
		<widget-content-frame title="Reviewing Tool">
			<template>
				<users-viewer />
			</template>
		</widget-content-frame>

		<widget-content-frame title="Editior Tool">
			<template>
				<users-editor />
			</template>
		</widget-content-frame>

		<widget-content-frame title="Overview Table">
			<template>
				<users-table />
			</template>
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersEditor from '@/components/admin/users/UsersEditorWidget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		UsersViewer: UsersViewer,
		UsersEditor: UsersEditor,
		UsersTable: UsersTable,
	},
};
</script>

<style scoped></style>
