<template>
	<admin-page-content-frame title="Experiments">
		<widget-content-frame title="Editor">
			<experiments-editor />
		</widget-content-frame>

		<widget-content-frame title="Launcher">
			<experiments-launcher-widget />
		</widget-content-frame>

		<widget-content-frame :isShownInitial="false" title="Administrators Experiments Logs">
			<experiments-admin-logs-widget />
		</widget-content-frame>

		<widget-content-frame :isShownInitial="false" title="Users Experiements Logs">
			<experiments-user-logs-widget />
		</widget-content-frame>

		<widget-content-frame title="List">
			<experiments-list-widget />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import ExperimentsEditor from '@/components/admin/experiments/ExperimentsEditorWidget.vue';

import ExperimentsAdminLogsWidget from '@/components/admin/experiments/widget-admin-logs/experiments-admin-logs.widget.vue';
import ExperimentsLauncherWidget from '@/components/admin/experiments/widget-launcher/experiments-launcher.widget.vue';
import ExperimentsListWidget from '@/components/admin/experiments/widget-list/experiments-list.widget.vue';
import ExperimentsUserLogsWidget from '@/components/admin/experiments/widget-user-logs/experiments-user-logs.widget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame,
		experimentsEditor: ExperimentsEditor,
		ExperimentsLauncherWidget,
		ExperimentsAdminLogsWidget,
		ExperimentsUserLogsWidget,
		ExperimentsListWidget,
	},
};
</script>

<style scoped></style>
