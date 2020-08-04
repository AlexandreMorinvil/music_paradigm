<template>
  <div class="page-grid">
    Admin Experiments page
    <experiments-workshop />
    <br />
    <br />INterface to create experiments
    <br />
    <br />FUcntionality to import curriculums (as Json files)
    <br />
    <br />List of all the existing experiments, their related information
  </div>
</template>

<script>
import ExperimentsWorkshop from "@/components/Admin/ExperimentsWorkshopWidget.vue";

export default {
  name: "AdminExperiments",
  components: {
    experimentsWorkshop: ExperimentsWorkshop,
  },
  data() {
    return {};
  },
  computed: {},
  methods: {
    handleExperimentFile(event) {},
  },
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
</style>
