<template>
  <div id="instruction-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />

    <skip-button v-if="hasSkipOption" class="skip-button" v-on:skipButtonClicked="emitSkipSignal" />

    <div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
      {{ textToDisplay }}
    </div>

    <div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <visual-piano v-if="hasInteractivePiano" />
      <img id="instruction-img" v-else :src="urlExperimentRessource(pictureName)" alt="Instruction" />
    </div>

    <footnote id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text" :message="footnote" />
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';
import VisualPiano from '@/components/VisualPiano.vue';
import SkipButton from '@/components/experiment/SkipButton.vue';
import Footnote from '@/components/experiment/footnote/Footnote.vue';

export default {
  name: 'Instruction',
  components: {
    visualPiano: VisualPiano,
    skipButton: SkipButton,
    footnote: Footnote,
  },
  props: {
    lastPressedKey: {
      type: String,
      default() {
        return '';
      },
    },
    isSpaceBarPressed: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['urlExperimentRessource']),
    ...mapGetters('piano', ['pressedKeys']),
    ...mapGetters('experiment', [
      'hasNoContent',
      'hasInteractivePiano',
      'hasText',
      'hasVisualMedia',
      'hasFootnote',
      'hasHelperImage',
      'hasSkipOption',
      'pictureName',
      'helperImageName',
      'textContent',
      'anyPianoKey',
      'skipStepButton',
      'footnoteMessage',
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText && this.hasVisualMedia) return 'grid-area-area-note';
        else return 'grid-area-note';
      } else {
        if (this.hasText && this.hasVisualMedia) return 'grid-area-area';
        else return 'grid-single-area';
      }
    },
    footnote() {
      if (this.footnoteMessage) return this.footnoteMessage;
      if (this.anyPianoKey) return 'Press any piano key or the space bar for going to the next step';
      else return 'Press the space bar for going to the next step';
    },
    textToDisplay() {
      if (this.hasNoContent) return 'Instruction';
      else return this.textContent;
    },
  },
  methods: {
    emitSkipSignal() {
      this.$emit('skipRequest');
    },
  },
  watch: {
    lastPressedKey(lastPressedKey) {
      if (this.hasSkipOption && lastPressedKey === this.skipStepButton) this.emitSkipSignal();
    },
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.$emit('stateEnded');
      }
    },
    pressedKeys(keys) {
      if (this.anyPianoKey && keys.length > 0) {
        this.$emit('stateEnded');
      }
    },
  },
};
</script>

<style scoped></style>
