<template>
  <div id="feedback-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />
    <div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">{{ textContent }}</div>

    <div id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <div class="feedback-grade-board">
        <!-- Default display if no performance was graded -->
        <p v-if="!hasGrades">No performance was graded</p>
        <div class="feedback-box" v-for="grade in grades" :key="grade.criteria">
          <feedback-grade :grade="grade" />
        </div>
      </div>
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">{{ footnote }}</div>
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';
import FeedbackGrade from '@/components/FeedbackGrade';

export default {
  name: 'Feedback',
  components: {
    feedbackGrade: FeedbackGrade,
  },
  props: {
    lastPressedKey: {
      type: String,
      default() {
        return "";
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
    ...mapGetters('piano', ['grades', 'pressedKeys']),
    ...mapGetters('experiment', [
      'hasText',
      'hasFootnote',
      'hasHelperImage',
      'hasSkipOption',
      'textContent',
      'helperImageName',
      'anyPianoKey',
      'skipStepButton',
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText) return 'grid-small-area-big-area-note';
        else return 'grid-area-note';
      } else {
        if (this.hasText) return 'grid-small-area-big-area';
        else return 'grid-single-area';
      }
    },
    footnote() {
      let footnote = '';
      if (this.anyPianoKey) footnote += 'Press any piano key or the space bar for going to the next step';
      else footnote += 'Press the space bar for going to the next step';
      if (this.hasSkipOption) footnote += ' or press ' + this.skipStepButton.toUpperCase() + ' to skip';

      return footnote;
    },
    hasGrades() {
      if (Array.isArray(this.grades) && this.grades.length > 0) return true;
      else return false;
    },
  },

  watch: {
    lastPressedKey(lastPressedKey) {
      if(this.hasSkipOption && lastPressedKey === this.skipStepButton)
        this.$emit('skipRequest');
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

<style scoped>
.feedback-grade-board {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}

.feedback-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 2% 0;
  width: auto;
  height: 100%;
}
</style>
