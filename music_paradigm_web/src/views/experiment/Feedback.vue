<template>
  <div id="feedback-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />

    <skip-button v-if="hasSkipOption && !isSkipButtonInFootnote" class="skip-button" />

    <div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">{{ textContent }}</div>

    <div id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <div class="feedback-grade-board">
        <p v-if="!hasGrades">No performance was graded</p>
        <div v-else class="feedback-box" v-for="grade in grades" :key="grade.criteria">
          <feedback-grade :grade="grade" />
        </div>
      </div>
      <div v-if="hasSuccessFeedbackMessage && isSuccessful" class="success-feedback-message">
        {{ successFeedbackMessage }}
      </div>
      <div v-if="hasFailureFeedbackMessage && !isSuccessful" class="success-feedback-message">
        {{ failureFeedbackMessage }}
      </div>
    </div>

    <footnote
      id="note-area"
      v-if="hasFootnote"
      class="experiment-state-division state-division-text"
      :message="footnote"
    />
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';
import { ExperimentEventBus } from '@/_services/eventBus.service.js';
import FeedbackGrade from '@/components/FeedbackGrade.vue';
import SkipButton from '@/components/experiment/SkipButton.vue';
import Footnote from '@/components/experiment/footnote/Footnote.vue';

export default {
  name: 'Feedback',
  components: {
    feedbackGrade: FeedbackGrade,
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
      'successFeedbackMessage',
      'failureFeedbackMessage',
      'footnoteMessage',
      'isSkipButtonInFootnote',
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
      if (this.footnoteMessage) return this.footnoteMessage;
      if (this.anyPianoKey) return 'Press any piano key or the space bar for going to the next step';
      else return 'Press the space bar for going to the next step';
    },
    hasGrades() {
      if (Array.isArray(this.grades) && this.grades.length > 0) return true;
      else return false;
    },
    isSuccessful() {
      if (this.grades.length <= 0) return false;
      for (let grade of this.grades) {
        if (grade.mark < grade.passMark) return false;
      }
      return true;
    },
    hasSuccessFeedbackMessage() {
      return Boolean(this.successFeedbackMessage);
    },
    hasFailureFeedbackMessage() {
      return Boolean(this.failureFeedbackMessage);
    },
  },
  methods: {
    emitStateEndedSignal() {
      this.$emit('state-ended');
    },
  },
  mounted() {
    ExperimentEventBus.$on('advance-request', this.emitStateEndedSignal);
  },
  beforeDestroy() {
    ExperimentEventBus.$off('advance-request', this.emitStateEndedSignal);
  },
  watch: {
    isSpaceBarPressed(isPressed) {
      if (isPressed) {
        this.emitStateEndedSignal();
      }
    },
    pressedKeys(keys) {
      if (this.anyPianoKey && keys.length > 0) {
        this.emitStateEndedSignal();
      }
    },
  },
};
</script>

<style scoped>
#visual-media-area {
  display: grid;
  grid-template-rows: 1fr auto;
  grid-template-columns: 1fr;
}

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

.success-feedback-message {
  text-align: center;
  font-size: calc(1vh + 1vw);
}
</style>
