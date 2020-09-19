<template>
  <div class="page-grid">
    Admin Curriculums page
    <widget-context>
      <template v-slot:title>Viewer</template>
      <template v-slot:widget>
        <curriculums-viewer />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Editor</template>
      <template v-slot:widget>
        <curriculums-editor />
      </template>
    </widget-context>
    <widget-context>
      <template v-slot:title>Board</template>
      <template v-slot:widget>
        <curriculums-table />
      </template>
    </widget-context>
    <br />
    <br />INterface to create curriculums
    <br />
    <br />FUcntionality to import curriculums (as Json files)
    <br />
    <br />List of all the existing curriculums and their relates informations
  </div>
</template>

<script>
import WidgetContext from "@/components/admin/WidgetContext.vue";
import CurriculumsViewer from "@/components/admin/curriculums/CurriculumsViewerWidget.vue";
import CurriculumsEditor from "@/components/admin/curriculums/CurriculumsEditorWidget.vue";
import CurriculumsTable from "@/components/admin/curriculums/CurriculumsTableWidget.vue";

// import { mapActions } from "vuex";

export default {
  components: {
    WidgetContext: WidgetContext,
    CurriculumsViewer: CurriculumsViewer,
    CurriculumsEditor: CurriculumsEditor,
    CurriculumsTable: CurriculumsTable,
  },
  name: "AdminCurriculums",
};
</script>

<style scoped>
</style>
