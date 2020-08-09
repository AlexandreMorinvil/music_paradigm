<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div class="submit-position">
      <button>test</button>
      <form v-on:submit.prevent="handleSubmit" ref="upload">
        <input type="file" id="myfile" name="myfile" v-on:change="handleExperimentFile" />
      </form>
    </div>

    <div class="edition-buttons-position">
      <button v-on:click="handleCompilation">Compile Edition</button>
      <button v-on:click="notEmplementedYet">Revert</button>
      <button v-on:click="notEmplementedYet">Clear</button>
    </div>

    <div class="selection-buttons-position">
      <button v-on:click="notEmplementedYet">Copy selection</button>
      <button v-on:click="notEmplementedYet">Unselect</button>
    </div>

    <div class="editor-position editor-size-fix">
      Experiment Editor :
      <code-editor id="text-editor" ref="codeEditor" />
    </div>

    <div class="reference-position editor-size-fix">
      Selected Experiment :
      <code-editor id="reference-editor" :readOnly="true" />
    </div>

    <div class="create-position">
      <button v-on:click="submitExperimentToCreate">Create Experiment</button>
    </div>

    <div class="update-position">
      <button>Update Selected Experiment</button>
      <button>Delete Experiment</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import CodeEditor from "@/components/Admin/TextEditor.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    codeEditor: CodeEditor,
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters("experiments", ["experimentEdited", "experimentSelected"]),
    editionContent() {
      return this.$refs.codeEditor.code;
    }
  },
  methods: {
    ...mapActions("alert", ["setErrorAlert"]),
    ...mapActions("experiments", [
      "compileExperiment",
      "attemptExperimentCompilation",
      "createExperiment",
    ]),
    setEditorContent(textContent){
      this.$refs.codeEditor.setValue(textContent);
    },
    handleExperimentFile(event) {
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
    submitExperimentToCreate() {
      this.createExperiment(this.experimentEdited);
    },
    handleCompilation() {
      const experimentObject = this.convertEditorTextToObject();
      this.compileExperiment(experimentObject);
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
    notEmplementedYet() {
      console.log("Not yet ready");
    },
  },
  mounted() {},
  destroyed() {},
  watch: {
    experimentEdited(value) {
      console.log(value);
      this.setEditorContent(JSON.stringify(value, null, '\t'));
    }
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
  background-color: darkblue;
}

.selection-buttons-position {
  grid-area: selection-btn;
  background-color: darkblue;
}

.create-position {
  grid-area: create;
  background-color: darkblue;
}

.update-position {
  grid-area: update;
  background-color: darkblue;
}

.editor-position {
  grid-area: editor;
  background-color: deepskyblue;
}

.reference-position {
  grid-area: reference;
  background-color: deepskyblue;
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
}
</style>
