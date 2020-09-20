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
              <label for="title">
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
              <label for="isSequential">
                Sequential :
                <span
                  class="selected-element-text-color"
                >{{ curriculumSelectedUsernameDisplay }}</span>
              </label>
              <input class="checkbox" v-model="isSequential" name="isSequential" type="checkbox" />
            </div>
          </div>

          <div class="experiments-parameters-section">
            <div>
              <button v-on:click="addTag()" class="widget-button blue small">Add</button>
              <label class="inline-label">
                Experiments(s) :
                <span
                  class="selected-element-text-color"
                >{{ userSelectedTagsDisplay }}</span>
              </label>
            </div>

            <div v-for="(experiment, index) in experiments" :key="index" class="experiment-input">
              <button v-on:click="removeTag(index)" class="widget-button small red">Remove</button>

              <div>
                <label for="experiment-title" class="inline-label">
                  Experiment Title :
                  <span
                    class="selected-element-text-color"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
                <input
                  type="text"
                  v-model="experiments[index].title"
                  name="experiment-title"
                  autocomplete="new-experiment-title"
                  placeholder="Insert new experiment title"
                />
              </div>

              <div>
                <label for="delay-in-days" class="inline-label">
                  Delay in Days :
                  <span
                    class="selected-element-text-color"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
                <input
                  type="number"
                  v-model="experiments[index].delayInDays"
                  name="delay-in-days"
                  autocomplete="new-delay-in-days"
                  placeholder="Insert new delay in days"
                />
              </div>

              <div>
                <label for="is-unique-in-day">
                  Unique in Day :
                  <span
                    class="selected-element-text-color"
                  >{{ curriculumSelectedUsernameDisplay }}</span>
                </label>
                <input
                  type="checkbox"
                  class="checkbox"
                  v-model="experiments[index].isUniqueIndDay"
                  name="is-unique-in-day"
                />
              </div>

              <div>
                <label for="completion-target" class="inline-label">
                  Completion Target :
                  <span
                    class="selected-element-text-color"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
                <input
                  type="number"
                  min="0"
                  v-model="experiments[index].completionTarget"
                  name="completion-target"
                  autocomplete="new-completion-target"
                  placeholder="Insert new completion target"
                />
              </div>

              <div>
                <label for="completion-limit" class="inline-label">
                  Completion Limit :
                  <span
                    class="selected-element-text-color"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
                <input
                  type="number"
                  min="0"
                  v-model="experiments[index].completionLimit"
                  name="completion-limit"
                  autocomplete="new-completion-limit"
                  placeholder="Insert new completion limit"
                />
              </div>

              <div>
                <label for="completion-limit" class="inline-label">
                  Experiment :
                  <span
                    class="selected-element-text-color"
                  >{{ userSelectedTagsDisplay }}</span>
                </label>
                <select name="experiment-reference" v-model="experiments[index].experimentReference">
                  <option
                    v-for="(reference, index) in experimentsReferences"
                    :key="index"
                    :value="experimentsReferences[index].id"
                  >{{ experimentsReferences[index].fullName }}</option>
                </select>
              </div>
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
      isSequential: true,
      experiments: [
        {
          title: "Introduction",
          delayInDays: 7,
          isUniqueIndDay: true,
          completionTarget: 1,
          completionLimit: 1,
          experimentReference: "5f32ab693a6197f5e56ab748",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("experiments", ["experimentsHeadersList"]),
    ...mapGetters("users", ["hasSelectedCurriculum", "curriculumSelectedId"]),
    experimentsReferences() {
      const fullReference = [];
      this.experimentsHeadersList.forEach((element) => {
        fullReference.push({
          id: element._id,
          fullName: element.group + "/" + element.name + "/v" + element.version,
        });
      });
      console.log(fullReference);
      return fullReference;
    },
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
.widget form {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 15px;
}

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
  display: inline-block;
}

.general-parameters-section input {
  display: inline;
  margin: auto;
}

.experiments-parameters-section {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 15px;
}

.inline-label {
  display: inline;
  margin: 0 15px;
}

.checkbox {
  width: 30px;
  height: 30px;
}
</style>
