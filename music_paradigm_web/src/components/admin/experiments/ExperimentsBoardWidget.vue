<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    TODO: Make the display more properly
    <div class="table-context">
      <table class="widget-table">
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
          <tr v-for="(header, index) in experimentsHeadersList" :key="header._id">
            <td>{{ index }}</td>
            <td>{{ header.group }}</td>
            <td>{{ header.name }}</td>
            <td>{{ header.version }}</td>
            <td>{{ header.folder }}</td>
            <td>
              <button>Edit</button>
              <button>Select</button>
              <button>Run</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ul>
      <li v-for="header in experimentsHeadersList" :key="header._id">
        <button v-on:click="runExperiment(header._id)">Quick select and Start</button>
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
    ...mapActions("experiments", [
      "fetchAllExperimentsHeaders",
      "startExperiment",
    ]),
    runExperiment(id) {
      this.startExperiment(id);
    },
  },
  mounted() {
    this.fetchAllExperimentsHeaders();
  },
};
</script>

<style scoped>
.table-context {
  background-color: rgb(15, 15, 15);
  width: 100%;
  height: 750px;
  display: inline-block;
  overflow-y: scroll;
}

table,
th,
td {
  border-collapse: collapse;
}

table {
  color: rgb(200, 200, 200);
  width: 100%;
}

thead {
  background-color: rgb(25, 25, 30);
  font-size: 0.9em;
  overflow-y: auto;
  width: 100%;
}

tbody {
  font-size: 0.8em;
  width: 100%;
}

tbody > tr:nth-child(odd) {
  background-color: rgb(45, 45, 50);
}

tbody > tr:nth-child(even) {
  background-color: rgb(30, 30, 35);
}

tbody > tr:hover {
  background-color: rgb(100, 100, 105);
}

thead > tr {
  background-color: inherit;
}

th {
  background-color: inherit;
  padding: 10px;
  text-align: center;
  position: sticky;
  top: 0;
}

td {
  padding: 10px;
  text-align: center;
}
</style>
