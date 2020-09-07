<template>
  <div class="page-grid">
    Admin Experiments page
    <widget-context>
      <template v-slot:title>Viewer</template>
      <template v-slot:widget>
        <experiments-viewer />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Editor</template>
      <template v-slot:widget>
        <experiments-editor />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Board</template>
      <template v-slot:widget>
        <experiments-table />
      </template>
    </widget-context>
  </div>
</template>

<script>
import WidgetContext from "@/components/admin/WidgetContext.vue";
import ExperimentsViewer from "@/components/admin/experiments/ExperimentsViewerWidget.vue";
import ExperimentsEditor from "@/components/admin/experiments/ExperimentsEditorWidget.vue";
import ExperimentsTable from "@/components/admin/experiments/ExperimentsTableWidget.vue";

export default {
  name: "AdminExperiments",
  components: {
    WidgetContext: WidgetContext,
    experimentsViewer: ExperimentsViewer,
    experimentsEditor: ExperimentsEditor,
    ExperimentsTable: ExperimentsTable
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

<style scoped>
</style>
