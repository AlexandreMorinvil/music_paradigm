<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div class="submit-position">
      <button>test</button>
    </div>

    <div class="buttons-position">
      <form v-on:submit.prevent="handleSubmit" ref="upload">
        <input type="file" id="myfile" name="myfile" v-on:change="handleExperimentFile" />
      </form>
      <button v-on:click="validateEdition">Compile Edition</button>
    </div>

    <div class="editor-position editor-size-fix">
      Experiment Editor :
      <code-editor id="text-editor" ref="codeEditor" />
    </div>

    <div class="reference-position">
      Selected Experiment :
      <code-editor id="reference-editor" :readOnly="true" />
    </div>

    <div class="create-position">
      <button>Create Experiment</button>
    </div>

    <div class="update-position">
      <button>Update Selected Experiment</button>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import CodeEditor from "@/components/Admin/TextEditor.vue";
import { mapActions } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    codeEditor: CodeEditor,
  },
  data() {
    return {};
  },
  computed: {
    editionContent() {
      return this.$refs.codeEditor.code;
    },
  },
  methods: {
    ...mapActions("alert", ["setInformationAlert", "setErrorAlert"]),
    ...mapActions("experiments", ["setEditedExperiment"]),
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
        })
        .catch((error) => {
          this.setErrorAlert(error.message);
        })
        .finally(()=> {
          this.$refs.upload.reset();
          console.log("Reached here");
        });
    },

    handleSubmit() {
      // TODO: Submit file to backend
      console.log("Handle submit was called");
    },
    validateEdition() {
      let experimentObject;
      try {
        experimentObject = JSON.parse(this.editionContent);
      } catch (e) {
        this.setErrorAlert(
          "The JSON syntax of the experiment definition is not valid"
        );
        return;
      }
      this.setEditedExperiment(experimentObject);
    },
  },
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
.submit-position {
  grid-area: submit;
  background-color: darkred;
}

.buttons-position {
  grid-area: buttons;
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
  /* grid-template-columns: 50% ; */
  /* grid-template-rows: 64pxx; */
  grid-template-areas:
    "submit submit"
    "buttons buttons"
    "editor reference"
    "create update";
}

.text-editor {
  width: 100%;
}
</style>
