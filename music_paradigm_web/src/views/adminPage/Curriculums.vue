<template>
  <admin-page-context title="Curriculum">
    <widget-context>
      <template v-slot:title
        >Viewer</template
      >
      <template v-slot:widget>
        <curriculums-viewer />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title
        >Editor</template
      >
      <template v-slot:widget>
        <curriculums-editor />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title
        >Board</template
      >
      <template v-slot:widget>
        <curriculums-table />
      </template>
    </widget-context>
  </admin-page-context>
</template>

<script>
import AdminPageContext from "@/components/admin/AdminPageContext.vue";
import WidgetContext from "@/components/admin/WidgetContext.vue";
import CurriculumsViewer from "@/components/admin/curriculums/CurriculumsViewerWidget.vue";
import CurriculumsEditor from "@/components/admin/curriculums/CurriculumsEditorWidget.vue";
import CurriculumsTable from "@/components/admin/curriculums/CurriculumsTableWidget.vue";

export default {
  components: {
    AdminPageContext: AdminPageContext,
    WidgetContext: WidgetContext,
    CurriculumsViewer: CurriculumsViewer,
    CurriculumsEditor: CurriculumsEditor,
    CurriculumsTable: CurriculumsTable,
  },
  name: "AdminCurriculums",
};
</script>

<style scoped></style>
