<template>
  <div id="instruction-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />
    <div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
      {{ textToDisplay }}
    </div>

    <div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <visual-piano v-if="hasInteractivePiano" />
      <img id="instruction-img" v-else :src="urlExperimentRessource(pictureName)" alt="Instruction" />
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">
      {{ footnote }}
    </div>
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';
import VisualPiano from '@/components/VisualPiano.vue';

export default {
  name: 'Instruction',
  components: {
    visualPiano: VisualPiano,
  },
  props: {
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
      'pictureName',
      'helperImageName',
      'textContent',
      'anyPianoKey',
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
      if (this.anyPianoKey) return 'Press any piano key or the space bar for going to the next step';
      else return 'Press the space bar for going to the next step';
    },
    textToDisplay() {
      if (this.hasNoContent) return 'Instruction';
      else return this.textContent;
    },
  },
  watch: {
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
