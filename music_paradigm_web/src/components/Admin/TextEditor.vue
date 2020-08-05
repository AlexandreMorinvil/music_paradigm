<template>
  <div id="text-editor">
    <!-- Two-way Data-Binding -->
    <codemirror class="text-editor" ref="cmEditor" v-model="code" :options="cmOptions" />

    <!-- Or manually control the data synchronization -->
    <!-- <codemirror
      ref="cmEditor"
      :value="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
    />-->
  </div>
</template>

<script>
// TODO: Add button to control text size
// TODO: Add props to specify wither the code editor can be edited or not
// TODO: Change the color of the text editor
// TODO: Add Gutter (JS Lit)
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

// import language js
import "codemirror/mode/javascript/javascript.js";

// import theme style
import "codemirror/theme/base16-dark.css";

export default {
  components: {
    codemirror,
  },
  data() {
    return {
      code: "{}",
      cmOptions: {
        tabSize: 4,

        mode: "application/json", //"text/javascript",
        theme: "base16-dark",
        lineNumbers: true,
        line: true,

        // Nore CodeMirror options
        indentUnit: 4,
        electricChars: true,
        lineWrapping: true,
        lineNumbers: true,
        readOnly: false,
        showCursorWhenSelecting: true,
        pasteLinesPerSelection: true,
      },
      textSizeFactor: 1,
    };
  },
  methods: {
    onCmReady(cm) {
      console.log("the editor is readied!", cm);
    },
    onCmFocus(cm) {
      console.log("the editor is focused!", cm);
    },
    onCmCodeChange(newCode) {
      this.code = newCode;
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
  },
};
</script>

<style scoped>
/* .CodeMirror {} */
</style>
