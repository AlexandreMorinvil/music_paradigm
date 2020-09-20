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
            <th>Role</th>
            <th>Username</th>
            <th>Email</th>
            <th>Full Name</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(header, index) in usersHeadersList"
            :key="header._id"
            :class="header._id === userSelectedId && 'selected'"
          >
            <td>{{ index + 1 }}</td>
            <td>{{ header.role }}</td>
            <td>{{ header.username }}</td>
            <td>{{ makeEmailDisplay(header.email) }}</td>
            <td>{{ makeFullNameDisplay(header.firstName, header.middleName, header.lastName) }}</td>
            <td style="white-space: pre-line">{{ makeTagsDisplay(header.tags) }}</td>
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
// TODO: Display the tasks summary
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";
import LoaderCircular from "@/components/LoaderCircular.vue";

export default {
  name: "UsersTableWidget",
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
      "userSelectedId"
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
    },
    makeEmailDisplay(email) {
      if(!email) return "---";
      else return email;
    },
    makeFullNameDisplay(firstName, middleName, lastName) {
      return firstName + " " + middleName + " " + lastName;
    },
    makeTagsDisplay(tagList) {
      if (tagList.length === 0) {
        return "---";
      } else {
        let display = "";
        for (let i in tagList) {
          if (i > 0) display += "\n";
          display += tagList[i];
        }
        return display;
      }
    },
  },
  mounted() {
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
