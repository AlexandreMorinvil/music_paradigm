<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <!-- TODO: FIX THE BUTTON HERE1111111111111111111111111111111 -->
    <button v-on:click="handleRefresh"></button>
    <div class="widget-table-context">
      <table class="widget-table">
        <colgroup>
          <col span="1" style="width: 10%;" />
          <col span="1" style="width: 20%;" />
          <col span="1" style="width: 20%;" />
          <col span="1" style="width: 10%;" />
          <col span="1" style="width: 20%;" />
          <col span="1" style="width: 20%;" />
        </colgroup>

        <thead>
          <tr>
            <th>#</th>
            <th>Group</th>
            <th>Name</th>
            <th>Version</th>
            <th>Ressource Folder</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(header, index) in experimentsHeadersList"
            :key="header._id"
            :class="header._id === selectedId && 'selected'"
          >
            <td>{{ index }}</td>
            <td>{{ header.group }}</td>
            <td>{{ header.name }}</td>
            <td>{{ header.version }}</td>
            <td>{{ header.folder }}</td>
            <td>
              <button v-on:click="handleeSelectToEditor(header._id)">&#xf044; Edit</button>
              <button v-on:click="handleSelectExperiment(header._id)">Select</button>
              <button v-on:click="handleStart(header._id)">Run</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
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
    ...mapGetters("experiments", ["experimentsHeadersList", "selectedId"]),
  },
  methods: {
    ...mapActions("experiments", [
      "fetchAllExperimentsHeaders",
      "setEditorExperiment",
      "setSelectionExperiment",
      "startExperimentQuick",
    ]),
    handleRefresh() {
      this.fetchAllExperimentsHeaders();
    },
    handleeSelectToEditor(id) {
      this.setEditorExperiment(id);
    },
    handleSelectExperiment(id) {
      this.setSelectionExperiment(id);
    },
    handleStart(id) {
      this.startExperimentQuick(id);
    },
  },
  mounted() {
    this.fetchAllExperimentsHeaders();
  },
};
</script>

<style scoped>
.widget-table-context {
  background-color: rgb(15, 15, 15);
  width: 100%;
  height: 750px;
  display: inline-block;
  overflow-y: scroll;
}

.widget-table-context table,
.widget-table-context th,
.widget-table-context td {
  border-collapse: collapse;
}

.widget-table-context table {
  color: rgb(200, 200, 200);
  width: 100%;
}

.widget-table-context thead {
  background-color: rgb(25, 25, 30);
  font-size: 0.9em;
  overflow-y: auto;
  width: 100%;
}

.widget-table-context tbody {
  font-size: 0.8em;
  width: 100%;
}

.widget-table-context tbody > tr:nth-child(odd) {
  background-color: rgb(45, 45, 50);
}

.widget-table-context tbody > tr:nth-child(even) {
  background-color: rgb(30, 30, 35);
}

.widget-table-context tbody > tr:hover {
  background-color: rgb(100, 100, 105);
}

.widget-table-context tbody > tr.selected {
  background-color: rgb(100, 200, 50);
  color: black;
}

.widget-table-context thead > tr {
  background-color: inherit;
}

.widget-table-context th {
  background-color: inherit;
  padding: 10px;
  text-align: center;
  position: sticky;
  top: 0;
}

.widget-table-context td {
  padding: 10px;
  text-align: center;
}
</style>
