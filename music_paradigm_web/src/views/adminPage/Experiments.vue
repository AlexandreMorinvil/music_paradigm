<template>
  <div class="page-grid">
    <admin-page-context title="Experiment Management">

        <widget-context>
          <template v-slot:title
            >Viewer</template
          >
          <template v-slot:widget>
            <experiments-viewer />
          </template>
        </widget-context>
        <widget-context>
          <template v-slot:title
            >Editor</template
          >
          <template v-slot:widget>
            <experiments-editor />
          </template>
        </widget-context>
        <widget-context>
          <template v-slot:title
            >Board</template
          >
          <template v-slot:widget>
            <experiments-table />
          </template>
        </widget-context>

    </admin-page-context>
  </div>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";
import WidgetContext from "@/components/admin/WidgetContext.vue";
import ExperimentsViewer from "@/components/admin/experiments/ExperimentsViewerWidget.vue";
import ExperimentsEditor from "@/components/admin/experiments/ExperimentsEditorWidget.vue";
import ExperimentsTable from "@/components/admin/experiments/ExperimentsTableWidget.vue";

export default {
  name: "AdminExperiments",
  components: {
    AdminPageContext: AdminPageContext,
    WidgetContext: WidgetContext,
    experimentsViewer: ExperimentsViewer,
    experimentsEditor: ExperimentsEditor,
    ExperimentsTable: ExperimentsTable,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {},
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped></style>
