<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    TODO: Make the display more properly
    <ul>
        <li v-for="header in experimentsHeadersList" :key="header._id">
            <button v-on:click="runExperiment(header._id)"> Quick select and Start </button>
            {{ header.group }} - {{ header.name }} - {{ header.version }} - {{ header.folder }}
        </li>
    </ul>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("experiments", ["experimentsHeadersList"]),
  },
  methods: {
    ...mapActions("experiments", ["fetchAllExperimentsHeaders", "startExperiment"]),
    runExperiment(id){
      this.startExperiment(id)
    }
  },
  mounted() {
    this.fetchAllExperimentsHeaders();
  },
};
</script>

<style scoped>
</style>
