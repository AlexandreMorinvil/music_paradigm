<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div class="options-position">
      <button v-on:click="handleRefresh" class="widget-button blue">Refresh</button>
    </div>
    <div class="board-position widget-table-context">
      <loader v-if="isListLoading" class="loader"></loader>
      <table v-else class="widget-table">
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
            v-for="(header, index) in usersHeadersList"
            :key="header._id"
            :class="header._id === selectedId && 'selected'"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ header.role }}</td>
            <td>{{ header.role }}</td>
            <td>{{ header.role }}</td>
            <td>{{ header.role }}</td>
            <td class="widget-table-actions-buttons">
              <button
                v-on:click="handleSelectUser(header._id)"
                class="widget-button small blue"
              >Select</button>
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
  name: " UsersWorkshopWidget",
  components: {
    loader: LoaderCircular,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("users", [
      "isFetchingUserHeadersList",
      "usersHeadersList",
      "selectedId",
    ]),
    isListLoading() {
      return this.isFetchingUserHeadersList;
    },
  },
  methods: {
    ...mapActions("users", ["fetchAllUsersHeaders", "setSelectedUser"]),
    handleRefresh() {
      this.fetchAllUsersHeaders();
    },
    handleSelectUser(id) {
      this.setSelectedUser(id);
    }
  },
  mounted() {
    console.log("Ça se rend");
    this.fetchAllUsersHeaders();
  },
};
</script>

<style scoped>
.options-position {
  grid-area: options;
  display: flex;
  justify-content: space-between;
}

.board-position {
  grid-area: board;
  display: flex;
  justify-content: center;
}

.widget {
  grid-template-areas:
    "options"
    "board";
}

.loader {
  width: 500px;
  height: 500px;
}
</style>
