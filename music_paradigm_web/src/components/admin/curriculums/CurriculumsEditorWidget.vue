<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleRevert" class="widget-button blue">Revert</button>
      <button v-on:click="handleUnselection" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position">
      <div class="editor-box-form">
        <form v-on:submit.prevent="doNothing()">
          <div class="general-parameters-section">
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
            <div>
              <label for="username">
                Sequential :
                <span
                  class="selected-element-text-color"
                >{{ curriculumSelectedUsernameDisplay }}</span>
              </label>
              <input 
                class="checkbox"
                v-model="isSequential"
                name="isSequential"
                type="checkbox" 
              />
            </div>
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
      isSequential: true
    };
  },
  computed: {
    ...mapGetters("users", ["hasSelectedCurriculum", "curriculumSelectedId"]),
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
  padding: 20px 40px;
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
.general-parameters-section {
  display: grid;
  grid-template-columns: 2fr auto;
  grid-gap: 15px;
}

.general-parameters-section div {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-gap: 15px;
}

.general-parameters-section label {
  /* background-color: khaki; */
  display: inline-block;
}

.general-parameters-section input {
  /* background-color: lightcoral; */
  display: inline;
  margin: auto;
}

.checkbox {
  width: 30px;
  height: 30px;
}
</style>
