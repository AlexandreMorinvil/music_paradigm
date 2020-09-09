<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleTODO" class="widget-button blue">Revert</button>
      <button v-on:click="handleTODO" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position code-context">
      <div class="user-editor-box-form">
        <form @submit.prevent="handleSubmit">
          <!-- Us abreviated names as "un", "pw" instead of the full names ("username", "password") to not match the WHATWG autofill
          specifications in order to prevent the autofill in Chrome. (The autocomple="off") does not disable the autocomplete in Chrome-->
          <div>
            <label for="username">Username</label>
            <input
              type="text"
              v-model="username"
              name="username"
              autocomplete="new-username"
              placeholder="Insert username"
            />
          </div>
          <div>
            <label for="email">Email</label>
            <input
              type="email"
              v-model="email"
              name="email"
              autocomplete="new-email"
              placeholder="Insert email"
            />
          </div>
          <div>
            <label for="password">Password</label>
            <input
              type="password"
              v-model="password"
              name="password"
              autocomplete="new-password"
              placeholder="Insert password"
            />
          </div>
          <div class="form-name-row">
            <div>
              <label for="firstName">First Name</label>
              <input
                type="text"
                v-model="firstName"
                name="firstName"
                autocomplete="new-first-name"
                placeholder="Insert first name"
              />
            </div>
            <div>
              <label for="middleName">Middle Name</label>
              <input
                type="text"
                v-model="middleName"
                name="middleName"
                autocomplete="new-middle-name"
                placeholder="Insert middle name"
              />
            </div>
            <div>
              <label for="lastName">Last Name</label>
              <input
                type="text"
                v-model="lastName"
                name="lastName"
                autocomplete="new-last-name"
                placeholder="Insert last name"
              />
            </div>
          </div>
          <div>
            <label for="groups">Group(s)</label>
            <div class="form-groups">
              <div v-for="(group, index) in groups" :key="group" class="form-group-input">
                <button v-on:click="handleSubmit()" class="widget-button small red">Delete</button>
                <input
                  type="text"
                  v-model="group[index]"
                  name="group"
                  autocomplete="new-group"
                  placeholder="Insert group name"
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>

    <div class="submission-buttons-position">
      <form v-on:submit.prevent="handleSubmit" ref="upload" style="display: none">
        <input
          type="file"
          id="myfile"
          name="myfile"
          v-on:change="handleUploadExperiment"
          ref="fileInput"
        />
      </form>
      <button v-on:click="$refs.fileInput.click()" class="widget-button blue">Upload</button>
      <button v-on:click="submitExperimentToCreate" class="widget-button green">Create</button>
      <button v-on:click="submitExperimentToUpdate" class="widget-button blue">Update</button>
      <button v-on:click="submitExperimentToDelete" class="widget-button red">Delete</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  data() {
    return {
      hasFocusedOnUsername: false,
      hasAttemptedSubmit: false,
      id: "",
      role: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      groups: ["a", "b", "c", "d"],
    };
  },
  computed: {
    ...mapGetters("experiments", ["userSelected", "userSelectedId"]),
  },
  methods: {
    ...mapActions("alert", ["setErrorAlert", "setInformationAlert"]),
    ...mapActions("users", [
      "unsetSelectionExperiment",
      "createUser",
      "updateUser",
      "deleteUser",
    ]),
    handleSubmit() {
      console.log(this.username);
    },
    submitExperimentToCreate() {
      this.createExperiment(this.experimentEdited);
    },
    submitExperimentToUpdate() {
      const answer = window.confirm(
        "Changing this experiment will affect all the users who will do this experiment in the future. Are your sure you want to modify the experiment?"
      );
      if (answer) {
        this.updateExperiment({
          id: this.selectedId,
          experiment: this.experimentEdited,
        });
      }
    },
    submitExperimentToDelete() {
      const answer = window.confirm(
        "Erasing this experiment will affect all the curriculums that might be including it. Are your sure you want to delete the experiment?"
      );
      if (answer) {
        this.deleteExperiment(this.selectedId);
      }
    },
    handleUnselection() {
      this.unsetSelectionExperiment();
    },
    handleUploadExperiment(event) {
      // const input = event.target;
      console.log("Todo", event);
    },
  },
};
</script>

<style scoped>
.submit-position {
  grid-area: submit;
  background-color: darkred;
}

.edition-buttons-position {
  grid-area: edition-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.selection-buttons-position {
  grid-area: selection-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.editor-position {
  grid-area: editor;
  background-color: rgb(40, 40, 40);
  padding: 10px;
  display: grid;
}

.submission-buttons-position {
  grid-area: submission-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr 1fr 1fr;
}

.widget {
  grid-template-columns: 100%;
  /* grid-template-rows: 64pxx; */
  grid-template-areas:
    "edition-btn"
    "editor"
    "submission-btn";
}

/* Form  */

.user-editor-box-form label {
  display: block;
  padding: 10px 0;
  font-size: 1em;
}

.user-editor-box-form input {
  display: inline-block;
  min-width: 100%;
  padding: 0.4em 0;
  border-radius: 4px;
  padding-left: 10px;
  font-size: 0.8em;
}

.form-note-text {
  text-align: right;
  font-size: 0.75rem;
  margin: 10px 0 10px;
}

.form-groups {
  display: grid;
  grid-gap: 10px;
}

.form-group-input input {
  width: 20%;
}

.form-group-input button {
  min-width: auto;
  width: 100px;
}

.form-group-input {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px auto;
}

.form-name-row {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 20px;
}
</style>
