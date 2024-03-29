<template>
	<div id="text-editor" :class="isFullScreen && 'fullscreen-context'">
		<!-- Two-way Data-Binding -->
		<div class="text-editor-button-panel" :class="isFullScreen && 'fullscreen-buttons'">
			<button class="text-editor-button editor-button-1" v-on:click="decreaseFontSize()">Decrease Size</button>
			<button class="text-editor-button editor-button-2" v-on:click="setDefaultFontSize()">Default Size</button>
			<button class="text-editor-button editor-button-3" v-on:click="increaseFontSize()">Increase Size</button>
			<button class="text-editor-button editor-button-3" v-on:click="setFullScreenMode()">Full Screen</button>
		</div>
		<codemirror
			class="text-editor"
			:class="isFullScreen && 'fullscreen-editor'"
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
import { codemirror } from 'vue-codemirror';
import jsonlint from 'jsonlint-mod';

// Import language js
import 'codemirror/mode/javascript/javascript.js';

// Import theme style
import 'codemirror/theme/solarized.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';

// Import addons
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint.js';

export default {
	components: {
		codemirror,
	},
	props: {
		assignedText: {
			type: String,
			default: ''
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
			isFullScreen: false,
			code: '',
			cmOptions: {
				tabSize: 4,
				mode: 'application/json', // "text/javascript",
				theme: 'solarized',
				lineNumbers: true,
				line: true,
				indentUnit: 4,
				electricChars: true,
				lineWrapping: false,
				readOnly: this.readOnly,
				showCursorWhenSelecting: true,
				pasteLinesPerSelection: true,
				gutters: ['CodeMirror-lint-markers'],
				lint: true,
			},
			textSizeFactor: 1,
			minTextSizeFactor: 0.1,
			maxTextSizeFactor: 3,
			textSizeFactorVariationStep: 0.2,
		};
	},
	computed: {
		codemirror() {
			return this.$refs.cmEditor.codemirror;
		},
		textSizeFactorCSSvariable() {
			return '--textSizeFactor: ' + this.textSizeFactor + ';';
		},
	},
	methods: {
		onCmReady() {
			this.$emit('ready');
		},
		// OnCmFocus(cm) {},
		onCmCodeChange(newCode) {
			this.code = newCode;
		},
		setValue(value) {
			this.codemirror.setValue(value);
		},
		clearValue() {
			this.codemirror.setValue('');
		},
		setDefaultFontSize() {
			this.textSizeFactor = 1;
			this.refresh();
		},
		increaseFontSize() {
			const newSize = this.textSizeFactor + this.textSizeFactorVariationStep;
			if (newSize <= this.maxTextSizeFactor) this.textSizeFactor = newSize;
			this.refresh();
		},
		decreaseFontSize() {
			const newSize = this.textSizeFactor - this.textSizeFactorVariationStep;
			if (newSize >= this.minTextSizeFactor) this.textSizeFactor = newSize;
			this.refresh();
		},
		setFullScreenMode() {
			this.isFullScreen = !this.isFullScreen;
			this.refresh();
		},
		refresh() {
			setTimeout(() => {
				this.codemirror.refresh();
				this.codemirror.setSize(null, null);
			}, 10);
		},
	},
	beforeMount() {
		window.jsonlint = jsonlint;
	},
	watch: {
		assignedText: {
			immediate: true,
			handler: function (text) {
				if (text) this.code = text;
				else this.code = '';
			},
		},
		isFullScreen(isTrue) {
			if (isTrue) {
				this.codemirror.setSize('100%', '100%');
			} else {
				this.codemirror.setSize('', '');
			}
		},
	},
};
</script>

<style scoped>
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

.text-editor-button:not(:first-of-type) {
	border-left-style: none;
}

.fullscreen-context {
	position: fixed;
	left: 0;
	top: 56px;
	width: 100vw;
	height: calc(100vh - 56px);
	z-index: 10;
}

.fullscreen-editor {
	z-index: 10;
	/* Purposely leaving a small space for the right side scroll bar to not be hidden by the scroll bar of the page */
	width: calc(100% - 15px);
	/* Purposely leaving a small space for the lower scroll bar */
	height: calc(100% - 30px);
}

.fullscreen-buttons > .text-editor-button {
	height: 30px;
}
</style>
