<template>
  <div id="users-editor" class="widget widget-box widget-bg">
    <div class="edition-buttons-position">
      <button v-on:click="handleRevert" class="widget-button blue">
        Revert
      </button>
      <button v-on:click="handleUnselection" class="widget-button blue">
        Unselect
      </button>
    </div>

    <div class="editor-position">
      <div class="editor-box-form">
        <div class="general-parameters-section">
          <div>
            <label for="title">
              Title :
              <span class="selected-element-text-color">{{
                curriculumSelectedTitleDisplay
              }}</span>
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
              Sequential:
              <span class="selected-element-text-color">{{
                curriculumSelectedIsSequentialDisplay
              }}</span>
            </label>
            <input
              class="checkbox"
              v-model="isSequential"
              name="isSequential"
              type="checkbox"
            />
          </div>
        </div>

        <div class="experiments-parameters-section">
          <div>
            <button v-on:click="addExperiment()" class="widget-button blue">
              Add
            </button>
            <label class="inline-label">
              Experiments(s):
            </label>
          </div>

          <div
            v-for="(experiment, index) in experiments"
            :key="index"
            class="experiment-input"
          >
            <div class="delete-position">
              <button v-on:click="removeTag(index)" class="widget-button red">
                Remove #{{ index }}
              </button>
            </div>

            <div class="experiment-position">
              <label for="completion-limit">
                Experiment:
                <span class="selected-element-text-color">{{
                  getExperimentFullNameFromList(
                    curriculumSelectedExperimentAtIndex(index)
                      .experimentReference
                  )
                }}</span>
              </label>
              <select
                name="experiment-reference"
                v-model="experiments[index].experimentReference"
              >
                <option
                  v-for="(reference, index) in experimentsReferences"
                  :key="index"
                  :value="experimentsReferences[index].id"
                >
                  {{ experimentsReferences[index].fullName }}
                </option>
              </select>
            </div>

            <div class="title-position">
              <label for="experiment-title">
                Experiment Title :
                <span class="selected-element-text-color">{{
                  curriculumSelectedExperimentAtIndex(index).title
                }}</span>
              </label>
              <input
                type="text"
                v-model="experiments[index].title"
                name="experiment-title"
                autocomplete="new-experiment-title"
                placeholder="Insert new experiment title"
              />
            </div>

            <div class="area1-position">
              <label for="is-unique-in-day" class="inline-label">
                Unique in Day:
                <span class="selected-element-text-color">{{
                  curriculumSelectedExperimentAtIndex(index).isUniqueIndDay
                }}</span>
              </label>
              <input
                type="checkbox"
                class="checkbox"
                v-model="experiments[index].isUniqueIndDay"
                name="is-unique-in-day"
              />
            </div>

            <div>
              <label for="delay-in-days">
                Delay (Days):
                <span class="selected-element-text-color">{{
                  curriculumSelectedExperimentAtIndex(index).delayInDays
                }}</span>
              </label>
              <input
                type="number"
                min="0"
                v-model="experiments[index].delayInDays"
                name="delay-in-days"
                autocomplete="new-delay-in-days"
                placeholder="Insert new delay in days"
              />
            </div>

            <div>
              <label for="completion-target">
                Completion Target:
                <span class="selected-element-text-color">{{
                  curriculumSelectedExperimentAtIndex(index).completionTarget
                }}</span>
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
              <label for="completion-limit">
                Completion Limit:
                <span class="selected-element-text-color">{{
                  curriculumSelectedExperimentAtIndex(index).completionLimit
                }}</span>
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
          </div>
        </div>
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
      <button v-on:click="$refs.fileInput.click()" class="widget-button blue">
        Upload
      </button>
      <button v-on:click="submitCurriculumToCreate" class="widget-button green">
        Create
      </button>
      <button v-on:click="submitUserToUpdate" class="widget-button blue">
        Update
      </button>
      <button v-on:click="submitUserToDelete" class="widget-button red">
        Delete
      </button>
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
      title: "",
      isSequential: false,
      experiments: [
        {
          title: "Introduction",
          delayInDays: 7,
          isUniqueIndDay: true,
          completionTarget: 1,
          completionLimit: 1,
          experimentReference: "5f32ab693a6197f5e56ab748",
        }
      ],
    };
  },
  computed: {
    ...mapGetters("experiments", ["experimentsHeadersList"]),
    ...mapGetters("curriculums", [
      "hasSelectedCurriculum",
      "curriculumSelectedId",
      "curriculumSelectedTitle",
      "curriculumSelectedIsSequential",
      "curriculumSelectedExperiments",
      "curriculumSelectedExperimentAtIndex",
    ]),
    experimentsReferences() {
      const fullReference = [];
      this.experimentsHeadersList.forEach((element) => {
        fullReference.push({
          id: element._id,
          fullName: this.formatExperimentUniqueName(element),
        });
      });
      return fullReference;
    },
    curriculumSelectedTitleDisplay() {
      return this.hasSelectedCurriculum
        ? this.curriculumSelectedTitle || "---"
        : "";
    },
    curriculumSelectedIsSequentialDisplay() {
      return this.hasSelectedCurriculum
        ? this.curriculumSelectedIsSequential || "---"
        : "";
    },
  },
  methods: {
    ...mapActions("experiments", ["fetchAllExperimentsHeaders"]),
    ...mapActions("curriculums", [
      "unsetSelectedCurriculum",
      "createCurriculum",
      "updateUser",
      "deleteUser",
    ]),
    bundleCurrirulumFromForm() {
      return {
        id: this.id,
        title: this.title,
        isSequential: this.isSequential,
        experiments: this.experiments,
      };
    },
    getExperimentFullNameFromList(id) {
      const experiment = this.experimentsReferences.filter((obj) => {
        return obj.id === id;
      });
      if (experiment[0]) return experiment[0].fullName;
      else return "";
    },
    formatExperimentUniqueName(experiment) {
      if (experiment)
        return (
          "" +
          experiment.group +
          "/" +
          experiment.name +
          "/v" +
          experiment.version
        );
      else return "";
    },
    addExperiment() {
      this.experiments.push({
        title: "",
        delayInDays: 0,
        isUniqueIndDay: true,
        completionTarget: 1,
        completionLimit: 1,
        experimentReference: "",
      });
    },
    removeTag(index) {
      this.experiments.splice(index, 1);
    },
    assignFormId(id) {
      this.id = id;
    },
    assignFormTitle(title) {
      this.title = title;
    },
    assignFormIsSequential(isSequential) {
      this.isSequential = isSequential;
    },
    assignFormExperiments(experiments) {
      this.experiments = Array.isArray(experiments)
        ? JSON.parse(JSON.stringify(experiments))
        : [];
    },
    assignSelectedToForm() {
      this.assignFormId(this.curriculumSelectedId);
      this.assignFormTitle(this.curriculumSelectedTitle);
      this.assignFormIsSequential(this.curriculumSelectedIsSequential);
      this.assignFormExperiments(this.curriculumSelectedExperiments);
    },
    clearForm() {
      this.assignFormId("");
      this.assignFormTitle("");
      this.assignFormIsSequential(false);
      this.assignFormExperiments([]);
    },
    handleRevert() {
      this.assignSelectedToForm();
    },
    submitCurriculumToCreate() {
      const curriculumToCreate = this.bundleCurrirulumFromForm();
      this.createCurriculum(curriculumToCreate);
    },
    submitUserToUpdate() {
      const answer = window.confirm(
        "Are your sure you want to edit the curriculum?"
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
        "Are your sure you want to delete the curriculum?"
      );
      if (answer) {
        this.deleteExperiment(this.selectedId);
      }
    },
    handleUnselection() {
      this.unsetSelectedCurriculum();
    },
    handleUploadExperiment(event) {
      console.log("Todo", event);
    },
  },
  beforeMount() {
    this.fetchAllExperimentsHeaders();
  },
  watch: {
    curriculumSelectedId: {
      immediate: true,
      handler: function() {
        this.assignSelectedToForm();
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

/* Experiment list */

.experiments-parameters-section {
  display: grid;
  grid-template-columns: 100%;
  grid-gap: 15px;
}

.delete-position {
  grid-area: delete;
  display: flex;
  justify-content: center;
  align-items: center;
}

.experiment-position {
  grid-area: experiment;
}

.title-position {
  grid-area: title;
}

.area1-position {
  grid-area: area1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.experiment-input {
  display: grid;
  grid-template-areas:
    "experiment experiment title title delete"
    ". . . area1 delete";
  grid-gap: 15px;

  background-color: var(--inner-form-background-color);
  padding: 5px 20px 20px;
}

/* Modifiers */

.inline-label {
  display: inline;
}

.checkbox {
  width: 30px;
  height: 30px;
}
</style>
