<template>
  <div id="experiments-workshop" class="widget widget-box widget-bg">
    <div class="submit-position">
      <button>test</button>
    </div>

    <div class="create-position">
      <button>Create Experiment</button>
    </div>

    <div class="update-position">
      <button>Update Selected Experiment</button>
    </div>

    <div class="buttons-position">
      <form v-on:submit.prevent="handleSubmit">
        <input type="file" id="myfile" name="myfile" v-on:change="handleExperimentFile" />
      </form>
      <button v-on:click="validateEdition">Set Edition Active</button>
    </div>

    <div class="editor-position editor-size-fix">
      Experiment Editor :
      <code-editor id="text-editor" />
    </div>

    <div class="reference-position">
      Selected Experiment :
      <code-editor id="reference-editor" :readOnly="true" />
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";
import CodeEditor from "@/components/Admin/TextEditor.vue";
import { validator } from "@/_helpers";
import { mapActions } from "vuex";

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    codeEditor: CodeEditor,
  },
  data() {
    return {
      editionContent: "{}1",
    };
  },
  computed: {},
  methods: {
    ...mapActions("alert", ["setInformationAlert", "setErrorAlert"]),
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
        console.log("A file must be selected");
        // TODO: Add alarm
        return;
      }

      readFileContent(input.files[0])
        .then((content) => {
          this.editionContent = content;
        })
        .catch((error) => {
          console.log(error);
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
        validator.validateExperiment(experimentObject);
      } catch (e) {
        this.setErrorAlert(
          e
          //"The JSON syntax of the definition of the experiment is not valid"
        );
        return false;
      }
      this.setInformationAlert(
        "The experiment in the code editor was set active"
      );
      return true;
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
    "create update"
    "buttons buttons"
    "editor reference";
}

.text-editor {
  width: 100%;
}
</style>
