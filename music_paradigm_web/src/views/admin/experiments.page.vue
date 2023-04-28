<template>
	<admin-page-content-frame title="Experiments">
		<widget-content-frame title="Experiment Editor">
			<experiments-editor />
		</widget-content-frame>

		<widget-content-frame title="Session Launcher">
			<experiments-launcher-widget />
		</widget-content-frame>

		<widget-content-frame title="Administrators Task Data">
			<experiments-admin-logs-widget />
		</widget-content-frame>

		<widget-content-frame title="Users Task Data">
			<experiments-users-logs-widget />
		</widget-content-frame>

		<TasksDataWidget />
		<widget-content-frame title="Tasks List">
			<tasks-list-widget />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import ExperimentsEditor from '@/components/admin/tasks/ExperimentsEditorWidget.vue';

import ExperimentsAdminLogsWidget from '@/components/admin/tasks/widget-admin-logs/experiments-admin-logs.widget.vue';
import ExperimentsLauncherWidget from '@/components/admin/tasks/widget-launcher/experiments-launcher.widget.vue';
import TasksDataWidget from '@/components/admin/tasks/widget-task-data/task-data.widget.vue';
import TasksListWidget from '@/components/admin/tasks/widget-list/tasks-list.widget.vue';

import ExperimentsUsersLogsWidget from '@/components/admin/tasks/widget-users-logs/experiments-users-logs.widget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame,
		experimentsEditor: ExperimentsEditor,
		ExperimentsLauncherWidget,
		ExperimentsAdminLogsWidget,
		ExperimentsUsersLogsWidget,
		TasksDataWidget,
		TasksListWidget,
	},
};
</script>

<style scoped></style>
