<template>
	<admin-page-content-frame title="Tasks">
		<widget-content-frame title="Tasks Editor">
			<experiments-editor />
		</widget-content-frame>

		<widget-content-frame title="Session Launcher">
			<experiments-launcher-widget />
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

import ExperimentsLauncherWidget from '@/components/admin/tasks/widget-launcher/experiments-launcher.widget.vue';
import TasksDataWidget from '@/components/admin/tasks/widget-task-data/task-data.widget.vue';
import TasksListWidget from '@/components/admin/tasks/widget-list/tasks-list.widget.vue';

import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame,
		experimentsEditor: ExperimentsEditor,
		ExperimentsLauncherWidget,
		TasksDataWidget,
		TasksListWidget,
	},
};
</script>

<style scoped></style>
