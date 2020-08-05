<template>
  <div id="experiments-workshop" class="widget widget-box">
    THIS IS BEING DISPLAYED
    <div class="submit-position">
      <button>test</button>
    </div>

    <div class="import-position">
      <form v-on:submit.prevent="handleSubmit">
        <input type="file" id="myfile" name="myfile" v-on:change="handleExperimentFile" />
      </form>
    </div>

    <div class="editor-position">
      <form v-on:submit.prevent="handleSubmit">
        <textarea
          id="w3review"
          class="text-editor"
          name="w3review"
          rows="20"
          cols="50"
          v-model="editableContent"
        ></textarea>
      </form>
    </div>

    <div class="reference-position">
      <div></div>
    </div>

    <div>
      <code-editor> </code-editor>
    </div>
  </div>
</template>

<script>
import "@/styles/widgetTemplate.css";

// import { codemirror } from 'vue-codemirror'
// import 'codemirror/lib/codemirror.css'

//import LoaderCircular from "@/components/LoaderCircular.vue";

import CodeEditor from "@/components/Admin/TextEditor.vue"

export default {
  name: "ExperimentsWorkshopWidget",
  components: {
    // loader: LoaderCircular,
    codeEditor: CodeEditor
  },
  data() {
    return {
      file: "",
      editableContent: "a",
    };
  },
  computed: {},
  methods: {
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
          this.editableContent = content;
        })
        .catch((error) => {
          console.log(error);
        });
    },

    handleSubmit() {
      // TODO: Submit file to backend
    },
  },
  mounted() {},
  destroyed() {},
  watch: {},
};
</script>

<style scoped>
.widget-box {
  background-color: rgb(238, 153, 111);
}

.submit-position {
  grid-area: submit;
  background-color: darkred;
}

.import-position {
  grid-area: import;
  background-color: darkblue;
}

.editor-position {
  grid-area: editor;
  background-color: deepskyblue;
}

.widget {
  /* grid-template-columns: auto;
  grid-template-rows: 64pxx; */
  grid-template-areas:
    "submit"
    "import"
    "editor";
}

.text-editor {
  width: 100%;
  white-space: nowrap;
  overflow: scroll;
  font-size: 0.5em;
}
</style>
