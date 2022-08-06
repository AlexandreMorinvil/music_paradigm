<template>
	<admin-page-content-frame title="Tasks">
		<widget-content-frame title="Tasks Editor">
			<tasks-management-task-code-editor-widget />
		</widget-content-frame>

		<widget-content-frame title="Session Launcher">
			<tasks-management-session-launcher-widget />
		</widget-content-frame>

		<widget-content-frame :isShownInitial="false" title="Data from Admins">
			<tasks-management-task-admin-data-widget />
		</widget-content-frame>

		<widget-content-frame :isShownInitial="false" title="Data from Users">
			<tasks-management-task-users-data-widget />
		</widget-content-frame>

		<widget-content-frame title="Tasks List">
			<tasks-management-tasks-list-widget />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';

import TasksManagementSessionLauncherWidget from '@/components/admin/tasks-management/widget-session-launcher/session-launcher.widget.vue';
import TasksManagementTaskAdminDataWidget from '@/components/admin/tasks-management/widget-task-admin-data/task-admin-data.widget.vue';
import TasksManagementTaskCodeEditorWidget from '@/components/admin/tasks-management/widget-task-code-editor/task-code-editor.widget.vue';
import TasksManagementTaskUsersDataWidget from '@/components/admin/tasks-management/widget-task-users-data/task-users-data.widget.vue';
import TasksManagementTasksListWidget from '@/components/admin/tasks-management/widget-tasks-list/tasks-list.widget.vue';

import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame,

		TasksManagementSessionLauncherWidget,
		TasksManagementTaskAdminDataWidget,
		TasksManagementTaskCodeEditorWidget,
		TasksManagementTaskUsersDataWidget,
		TasksManagementTasksListWidget,
	},
};
</script>

<style scoped></style>
