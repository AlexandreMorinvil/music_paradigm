<template>
  <div id="text-editor">
    <!-- Two-way Data-Binding -->
    <div class="text-editor-button-panel">
      <button class="text-editor-button editor-button-1" v-on:click="decreaseFontSize()">Decrease Size</button>
      <button class="text-editor-button editor-button-2" v-on:click="setDefaultFontSize()">Default Size</button>
      <button class="text-editor-button editor-button-3" v-on:click="increaseFontSize()">Increase Size</button>
    </div>
    <codemirror
      class="text-editor"
      ref="cmEditor"
      v-model="code"
      :options="cmOptions"
      @ready="onCmReady"
      @focus="onCmFocus"
      @input="onCmCodeChange"
      :style="textSizeFactorCSSvariable"
    />
  </div>
</template>

<script>
// TODO: Add props to specify wither the code editor can be edited or not
// TODO: Change the color of the text editor
// TODO: Add Gutter (JS Lit)
// TODO: Link text to something external
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
        indentUnit: 4,
        electricChars: true,
        lineWrapping: false,
        lineNumbers: true,
        readOnly: false,
        showCursorWhenSelecting: true,
        pasteLinesPerSelection: true,
      },
      textSizeFactor: 1,
      minTextSizeFactor: 0.1,
      maxTextSizeFactor: 3,
      textSizeFactorVariationStep: 0.2,
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
    setDefaultFontSize() {
      this.textSizeFactor = 1;
    },
    increaseFontSize() {
      const newSize = this.textSizeFactor + this.textSizeFactorVariationStep;
      if (newSize <= this.maxTextSizeFactor) this.textSizeFactor = newSize;
    },
    decreaseFontSize() {
      const newSize = this.textSizeFactor - this.textSizeFactorVariationStep;
      if (newSize >= this.minTextSizeFactor) this.textSizeFactor = newSize;
    },
  },
  computed: {
    codemirror() {
      return this.$refs.cmEditor.codemirror;
    },
    textSizeFactorCSSvariable() {
      return "--textSizeFactor: " + this.textSizeFactor;
    },
  },
  mounted() {},
};
</script>

<style scoped>
/* .CodeMirror {} */

.text-editor {
  font-size: calc(0.6em * var(--textSizeFactor));
}


.text-editor-button-panel {
  display: flex;
  height: 25px;
  flex-direction: row;
  justify-content: space-between;
}

.text-editor-button {
  background-color: rgb(220, 220, 220);
  width: 100%;
  border-radius: 0;
  border-width: 1px;
}

.editor-button-1 {
  border-right-style: none;
}

/* .editor-button-2 {} */

.editor-button-3 {
  border-left-style: none;
}

</style>
