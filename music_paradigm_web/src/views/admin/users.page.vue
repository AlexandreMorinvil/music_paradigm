<template>
	<AdminPageContentFrame title="Users">
		<ManageUserWidget />
		<ManageUserProgressionWidget />

		<widget-content-frame-component :isShownInitial="false" title="Users Logs">
			<users-logs-widget />
		</widget-content-frame-component>

		<UsersListWidget />
	</AdminPageContentFrame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import ManageUserProgressionWidget from '@/components/admin/users/widget-manage-user-progression/manage-user-progression.widget.vue';
import ManageUserWidget from '@/components/admin/users/widget-manage-user/manage-user.widget.vue';
import UsersListWidget from '@/components/admin/users/widget-users-list/users-list.widget.vue';
import UsersLogsWidget from '@/components/admin/users/widget-logs/users-logs.widget.vue';
import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		ManageUserProgressionWidget,
		ManageUserWidget,
		UsersListWidget,
		UsersLogsWidget,
		WidgetContentFrameComponent,
	},
};
</script>

<style scoped></style>
