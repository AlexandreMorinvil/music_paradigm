<template>
  <div id="text-editor">
    <!-- Two-way Data-Binding -->
    <div class="text-editor-button-panel">
      <button
        class="text-editor-button editor-button-1"
        v-on:click="decreaseFontSize()"
      >Decrease Size</button>
      <button
        class="text-editor-button editor-button-2"
        v-on:click="setDefaultFontSize()"
      >Default Size</button>
      <button
        class="text-editor-button editor-button-3"
        v-on:click="increaseFontSize()"
      >Increase Size</button>
    </div>
    <codemirror
      class="text-editor"
      ref="cmEditor"
      v-model="code"
      :options="cmOptions"
      @ready="onCmReady"
      @input="onCmCodeChange"
      :style="textSizeFactorCSSvariable"
    />
  </div>
</template>

<script>
import { codemirror } from "vue-codemirror";
import jsonlint from "jsonlint-mod";

// import language js
import "codemirror/mode/javascript/javascript.js";

// import theme style
import "codemirror/theme/solarized.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";

// Import addons
import "codemirror/addon/lint/lint";
import "codemirror/addon/lint/json-lint.js";

export default {
  components: {
    codemirror,
  },
  props: {
    startText: {
      type: String,
      default() {
        return "";
      },
    },
    readOnly: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      code: "",
      cmOptions: {
        tabSize: 4,
        mode: "application/json", //"text/javascript",
        theme: "solarized",
        lineNumbers: true,
        line: true,
        indentUnit: 4,
        electricChars: true,
        lineWrapping: false,
        readOnly: this.readOnly,
        showCursorWhenSelecting: true,
        pasteLinesPerSelection: true,
        gutters: ["CodeMirror-lint-markers"],
        lint: true,
      },
      textSizeFactor: 1,
      minTextSizeFactor: 0.1,
      maxTextSizeFactor: 3,
      textSizeFactorVariationStep: 0.2,
    };
  },
  methods: {
    onCmReady() {
      this.$emit("ready");
    },
    // onCmFocus(cm) {},
    onCmCodeChange(newCode) {
      this.code = newCode;
    },
    setValue(value) {
      this.codemirror.setValue(value);
    },
    clearValue() {
      this.codemirror.setValue("");
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
  beforeMount() {
    window.jsonlint = jsonlint;
  },
  mounted() {
    // Deep copy the text of the start value props
    if (this.startText) this.code = (" " + this.startText).slice(1);
  },
};
</script>

<style scoped>
/* .CodeMirror {} */

.text-editor {
  font-size: calc(0.6em * var(--textSizeFactor));
}

.text-editor-button-panel {
  display: flex;
  min-height: auto;
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
