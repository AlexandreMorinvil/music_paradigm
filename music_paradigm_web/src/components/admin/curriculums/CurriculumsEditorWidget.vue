<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleRevert" class="widget-button blue">Revert</button>
      <button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position">
      <div class="editor-box-form">
        <form v-on:submit.prevent="doNothing()">
          <div>
            <label for="username">
              Title :
              <span
                class="selected-element-text-color"
              >{{ curriculumSelectedUsernameDisplay }}</span>
            </label>
            <input
              type="text"
              v-model="title"
              name="title"
              autocomplete="new-username"
              placeholder="Insert new title"
            />
          </div>
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
import "@/styles/formTemplate.css";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "CurriculumWorkshopWidget",
  data() {
    return {
      id: "",
      title: "abcefg",
    };
  },
  computed: {
    ...mapGetters("users", [
      "hasSelectedCurriculum",
      "curriculumSelectedId"
    ]),
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
    assignFormTitle(title) {
      this.title = title;
    },
    assignSelectedToForm() {
      this.assignFormId(this.userSelectedId);
      this.assignFormTitle(this.curriculumSelectedId);
    },
    clearForm() {
      this.assignFormId("");
      this.assignFormTitle("");
    },
    handleRevert() {},
    handleSubmit() {},
    submitUserToCreate() {},
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
.edition-buttons-position {
  grid-area: edition-btn;
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
  grid-template-areas:
    "edition-btn"
    "editor"
    "submission-btn";
}

/* Form  */
</style>
