<template>
  <admin-page-context title="Experiments">
    <widget-context title="Reviewing Tool">
      <template>
        <experiments-viewer />
      </template>
    </widget-context>

    <widget-context title="Editor Tool">
      <template>
        <experiments-editor />
      </template>
    </widget-context>

    <widget-context title="Overview Table">
      <template>
        <experiments-table />
      </template>
    </widget-context>
  </admin-page-context>
</template>

<script>
import AdminPageContext from'@/components/admin/AdminPageContext.vue';
import WidgetContext from'@/components/admin/WidgetContext.vue';
import ExperimentsViewer from'@/components/admin/experiments/ExperimentsViewerWidget.vue';
import ExperimentsEditor from'@/components/admin/experiments/ExperimentsEditorWidget.vue';
import ExperimentsTable from'@/components/admin/experiments/ExperimentsTableWidget.vue';

export default{
	name: 'AdminExperiments',
	components: {
		AdminPageContext: AdminPageContext,
		WidgetContext: WidgetContext,
		experimentsViewer: ExperimentsViewer,
		experimentsEditor: ExperimentsEditor,
		ExperimentsTable: ExperimentsTable
	},
	data() {
		return{};
	},
	computed: {},
	methods: {},
	mounted() {},
	destroyed() {},
	watch: {}
};
</script>

<style scoped></style>
