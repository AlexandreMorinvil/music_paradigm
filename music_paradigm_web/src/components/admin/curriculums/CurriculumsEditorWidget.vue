<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleRevert" class="widget-button blue">Revert</button>
      <button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position">
      <div class="user-editor-box-form">
        <form submit.prevent>
        </form>
      </div>
    </div>

    <div class="submission-buttons-position">
      <form submit.prevent ref="upload" style="display: none">
        <input
          type="file"
          id="myfile"
          name="myfile"
          v-on:change="handleUploadExperiment"
          ref="fileInput"
        />
      </form>
      <button v-on:click="$refs.fileInput.click()" class="widget-button blue">Upload</button>
      <button v-on:click="submitUserToCreate" class="widget-button green">Create</button>
      <button v-on:click="submitUserToUpdate" class="widget-button blue">Update</button>
      <button v-on:click="submitUserToDelete" class="widget-button red">Delete</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CurriculumWorkshopWidget",
  data() {
    return {
      hasFocusedOnUsername: false,
      hasAttemptedSubmit: false,
      id: "",
      username: "",
      password: "",
      email: "",
      firstName: "",
      middleName: "",
      lastName: "",
      groups: [],
      role: "",
    };
  },
  computed: {
    ...mapGetters("users", [])
  },
  methods: {
    ...mapActions("alert", []),
    ...mapActions("users", [
      "unsetSelectedUser",
      "createUser",
      "updateUser",
      "deleteUser",
    ]),
    assignFormId(id) {
      this.id = id;
    },
    handleRevert() {
    },
    handleSubmit() {
    },
    submitUserToCreate() {
    },
    submitUserToUpdate() {
      const answer = window.confirm(
        "Are your sure you want to edit the user(s)?"
      );
      if (answer) {
        this.updateExperiment({
          id: this.selectedId,
          experiment: this.experimentEdited,
        });
      }
    },
    submitUserToDelete() {
      const answer = window.confirm(
        "Are your sure you want to delete the user(s)?"
      );
      if (answer) {
        this.deleteExperiment(this.selectedId);
      }
    },
    handleUnselection() {
      this.unsetSelectedUser();
    },
    handleUploadExperiment(event) {
      console.log("Todo", event);
    },
  },
  watch: {
    userSelectedId: {
      immediate: true,
      handler: function () {
        //this.assignSelectedToForm();
      },
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
  padding: 5px 40px 25px;
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
  margin-top: 15px;
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

.selected-user-attribute {
  color: rgb(24, 210, 24);
}
</style>
