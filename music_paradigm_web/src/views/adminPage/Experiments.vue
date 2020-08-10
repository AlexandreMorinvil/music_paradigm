<template>
  <div class="page-grid">
    Admin Experiments page
    <experiments-editor />
    <experiments-board />
    <br />
    <br />INterface to create experiments
    <br />
    <br />FUcntionality to import curriculums (as Json files)
    <br />
    <br />List of all the existing experiments, their related information
  </div>
</template>

<script>
import experimentsEditor from "@/components/admin/experiments/ExperimentsEditorWidget.vue";
import experimentsBoard from "@/components/admin/experiments/ExperimentsBoardWidget.vue";

export default {
  name: "AdminExperiments",
  components: {
    experimentsEditor: experimentsEditor,
    experimentsBoard: experimentsBoard,
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
