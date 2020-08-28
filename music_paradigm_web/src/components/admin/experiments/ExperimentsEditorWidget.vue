<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div
      class="submit-position"
    >//TODO: Form to create an experiment throug buttons and predefined areas instead of editing from de code editor</div>

    <div class="edition-buttons-position">
      <button v-on:click="handleCompilation" class="widget-button blue">Compile</button>
      <button v-on:click="handleReversion" class="widget-button blue">Revert</button>
      <button v-on:click="handleClearance" class="widget-button blue">Clear</button>
    </div>

    <div class="selection-buttons-position">
      <button v-on:click="handleCopying" class="widget-button blue">Copy to Editor</button>
      <button v-on:click="notEmplementedYet" class="widget-button blue">Unselect</button>
    </div>

    <div class="editor-position editor-size-fix">
      <div class="text-editor-label">Experiment Editor : {{editionStatus}}</div>
      <div class="editor-size-fix">
        <code-editor
          class="text-editor"
          v-on:ready="writeEditionToEditorChanges"
          :readOnly="false"
          ref="codeEditor"
        />
      </div>
    </div>

    <div class="reference-position">
      <div class="text-editor-label">Selected Experiment : {{selectionStatus}}</div>
      <div class="editor-size-fix">
        <code-editor
          class="text-editor"
          v-on:ready="writeSelectionToReferenceChanges"
          :readOnly="true"
          ref="codeReference"
        />
      </div>
    </div>

    <div class="create-position">
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
    </div>

    <div class="update-position">
      <button v-on:click="notEmplementedYet" class="widget-button blue">Update</button>
      <button v-on:click="notEmplementedYet" class="widget-button red">Delete</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import { mapActions, mapGetters } from "vuex";
import { validator } from "@/_helpers";
import CodeEditor from "@/components/admin/TextEditor.vue";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    codeEditor: CodeEditor,
  },
  data() {
    return {
      isCodeCompiled: false,
    };
  },
  computed: {
    ...mapGetters("experiments", ["experimentEdited", "experimentSelected"]),
    editionContent() {
      return this.$refs.codeEditor.code;
    },
    editionStatus() {
      return "Edition Status (TODO)";
    },
    selectionStatus() {
      return "Selection Status (TODO)";
    },
  },
  methods: {
    ...mapActions("alert", ["setErrorAlert", "setInformationAlert"]),
    ...mapActions("experiments", [
      "compileExperiment",
      "copySelectionToEdition",
      "attemptExperimentCompilation",
      "createExperiment",
    ]),
    setEditorContent(textContent) {
      this.$refs.codeEditor.setValue(textContent);
    },
    setReferenceContent(textContent) {
      this.$refs.codeReference.setValue(textContent);
    },
    submitExperimentToCreate() {
      this.createExperiment(this.experimentEdited);
    },
    handleCompilation() {
      const experimentObject = this.convertEditorTextToObject();
      this.compileExperiment(experimentObject);
      this.isCodeCompiled = true;
    },
    handleReversion() {
      this.setEditorContent(JSON.stringify(this.experimentEdited, null, "\t"));
      this.isCodeCompiled = false;
    },
    handleClearance() {
      this.setEditorContent(
        JSON.stringify(
          validator.getMinimalValidExperimentStructure(),
          null,
          "\t"
        )
      );
      this.isCodeCompiled = false;
    },
    handleCopying() {
      this.copySelectionToEdition();
    },
    handleUploadExperiment(event) {
      const input = event.target;

      const readFileContent = function (file) {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = (event) => resolve(event.target.result);
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
      };

      if (!("files" in input) || !(input.files.length === 1)) {
        this.setErrorAlert("A file must be selected");
        return;
      }

      readFileContent(input.files[0])
        .then((content) => {
          this.$refs.codeEditor.setValue(content);
          this.attemptExperimentCompilation(
            this.convertEditorTextToObject(content)
          );
        })
        .catch((error) => {
          this.setErrorAlert(error.message);
        })
        .finally(() => {
          this.$refs.upload.reset();
        });
    },
    convertEditorTextToObject() {
      try {
        return JSON.parse(this.editionContent);
      } catch (e) {
        this.setErrorAlert(
          "The JSON syntax of the experiment definition is not valid"
        );
      }
    },
    writeEditionToEditorChanges() {
      this.$watch(
        "experimentEdited",
        (newValue) => {
          this.setEditorContent(JSON.stringify(newValue, null, "\t"));
        },
        { immediate: true }
      );
    },
    writeSelectionToReferenceChanges() {
      this.$watch(
        "experimentSelected",
        (newValue) => {
          this.setReferenceContent(JSON.stringify(newValue, null, "\t"));
        },
        { immediate: true }
      );
    },
    notEmplementedYet() {
      this.setInformationAlert("TODO");
      console.log("Not yet ready");
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
  grid-template-columns: 1fr 1fr 1fr;
}

.selection-buttons-position {
  grid-area: selection-btn;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.editor-position {
  grid-area: editor;
  background-color: rgb(225, 225, 225);
  color: black;
  display: grid;
  /* grid-template-rows: auto; */
}

.reference-position {
  grid-area: reference;
  background-color: rgb(225, 225, 225);
  color: black;
  display: grid;
  /* grid-template-rows: auto; */
}

.create-position {
  grid-area: create;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.update-position {
  grid-area: update;
  display: grid;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
}

.widget {
  grid-template-columns: 1fr 1fr;
  /* grid-template-rows: 64pxx; */
  grid-template-areas:
    "submit submit"
    "edition-btn selection-btn"
    "editor reference"
    "create update";
}

.text-editor {
  width: 100%;
  height: 100%;
  z-index: inherit;
}

.text-editor-label {
  padding: 10px;
}
</style>
