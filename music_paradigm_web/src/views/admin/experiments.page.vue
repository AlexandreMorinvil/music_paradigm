<template>
	<admin-page-content-frame title="Experiments">
		<!-- <widget-content-frame title="Reviewier">
			<experiments-viewer />
		</widget-content-frame> -->

		<widget-content-frame title="Editor">
			<experiments-editor />
		</widget-content-frame>

		<widget-content-frame title="Launcher">
			<experiments-launcher-widget />
		</widget-content-frame>

		<widget-content-frame title="List">
			<experiments-list-widget />
		</widget-content-frame>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import ExperimentsEditor from '@/components/admin/experiments/ExperimentsEditorWidget.vue';
import ExperimentsLauncherWidget from '@/components/admin/experiments/widget-launcher/experiments-launcher.widget.vue';
import ExperimentsListWidget from '@/components/admin/experiments/widget-list/experiments-list.widget.vue';
// import ExperimentsViewer from '@/components/admin/experiments/ExperimentsViewerWidget.vue';
import WidgetContentFrame from '@/components/content-frame/widget-content-frame.component.vue';

export default {
	components: {
		AdminPageContentFrame,
		WidgetContentFrame: WidgetContentFrame,
		// experimentsViewer: ExperimentsViewer,
		experimentsEditor: ExperimentsEditor,
		ExperimentsLauncherWidget,
		ExperimentsListWidget,
	},
};
</script>

<style scoped></style>
