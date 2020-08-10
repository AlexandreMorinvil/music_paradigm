<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <ul>
        <li v-for="header in experimentsHeadersList" :key="header._id">
            {{ header.group }} - {{ header.name }} - {{ header.version }} - {{ header.folder }}
        </li>
    </ul>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";
import { validator } from "@/_helpers";

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
    ...mapActions("experiments", ["fetchAllExperimentsHeaders"]),
  },
  mounted() {
    this.fetchAllExperimentsHeaders();
  },
};
</script>

<style scoped>
</style>
