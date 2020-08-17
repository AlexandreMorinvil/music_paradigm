<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div class="options-position">
      <button v-on:click="handleRefresh" class="widget-button blue">Refresh</button>
    </div>
    <div class="board-position widget-table-context">
      <loader v-if="isListLoading" class="loader"></loader>
      <table v-else class="widget-table">
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
import LoaderCircular from "@/components/LoaderCircular.vue";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    loader: LoaderCircular,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("experiments", [
      "isFetchingExperimentHeadersList",
      "experimentsHeadersList",
      "selectedId",
    ]),
    isListLoading() {
      return this.isFetchingExperimentHeadersList;
    },
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
.options-position {
  grid-area: options;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.board-position {
  grid-area: board;
  display: flex;
  justify-content: center;
  align-items: center;
}

.widget {
  grid-template-areas:
    "options"
    "board";
}

.options-position > * {
  margin: 5px 0px;
}

.loader {
  width: 500px;
  height: 500px;
}
</style>
