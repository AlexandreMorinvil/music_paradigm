<template>
  <div id="rest-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />

    <skip-button v-if="hasSkipOption" class="skip-button" v-on:skip-request="emitSkipSignal" />

    <div v-if="hasText || hasNoContent" id="text-area" class="experiment-state-division state-division-text">
      <p>{{ textToDisplay }}</p>
      <!-- Default display if no content is provided -->
      <p v-if="hasNoContent">Rest</p>
    </div>

    <div v-if="hasVisualMedia" id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <visual-piano v-if="hasInteractivePiano" />
      <img id="cue-img" v-else :src="urlExperimentRessource(pictureName)" alt="Rest" />
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">{{ footnote }}</div>
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapGetters } from 'vuex';
import VisualPiano from '@/components/VisualPiano.vue';
import SkipButton from '@/components/experiment/SkipButton.vue';

export default {
  name: 'Rest',
  components: {
    visualPiano: VisualPiano,
    skipButton: SkipButton,
  },
  props: {
    lastPressedKey: {
      type: String,
      default() {
        return '';
      },
    },
  },
  data() {
    return {
      defaultTimeLimitInSeconds: 15, // Default time limit if no time is specified in the experiment
      counterUniqueIdentifier: 0, // Unique Identifier of the countdown used for clean up
      timeLeftInMilliseconds: 0, // Time left to the countdown
      timeStepInMilliseconds: 500, // Timesteps of the countdown in miliseconds
    };
  },
  computed: {
    ...mapGetters(['urlExperimentRessource']),
    ...mapGetters('experiment', ['pictureName', 'timeoutInSeconds']),
    ...mapGetters('experiment', [
      'hasNoContent',
      'hasInteractivePiano',
      'hasText',
      'hasVisualMedia',
      'hasFootnote',
      'hasHelperImage',
      'hasSkipOption',
      'textContent',
      'pictureName',
      'helperImageName',
      'skipStepButton',
      'timeoutInSeconds',
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
    textToDisplay() {
      if (this.hasNoContent) return '';
      else return this.textContent;
    },
    footnote() {
      if (this.footnoteMessage) return this.footnoteMessage;
      return `The experiment will go to the next step in ${this.timeLeftDisplay}`;
    },
    timeLimitInMiliseconds() {
      return (this.timeoutInSeconds || this.defaultTimeLimitInSeconds) * 1000;
    },
    timeLeftDisplay() {
      var display = '';
      const minutes = Math.floor((this.timeLeftInMilliseconds / 1000 / 60) % 60);
      const seconds = Math.floor((this.timeLeftInMilliseconds / 1000) % 60);
      if (minutes > 0) {
        display += `${minutes} minutes `;
      }
      display += `${seconds} seconds`;
      return display;
    },
  },
  methods: {
    startCountdown() {
      // this.timeLeftInMilliseconds = this.timeLimitInSeconds * 1000;
      this.referenceTime = Date.parse(new Date());
      this.counterUniqueIdentifier = window.setInterval(this.countdown, this.timeStepInMilliseconds);
    },
    countdown() {
      this.timeLeftInMilliseconds = Math.max(this.timeLimitInMiliseconds - (Date.now() - this.referenceTime), 0);
    },
    emitSkipSignal() {
      this.$emit('skip-request');
    },
  },
  mounted() {
    // Starting the countdown of the maximum time for the rest
    this.startCountdown();
  },
  beforeDestroy() {
    window.clearInterval(this.counterUniqueIdentifier);
  },
  watch: {
    lastPressedKey(lastPressedKey) {
      if (this.hasSkipOption && lastPressedKey === this.skipStepButton) this.emitSkipSignal();
    },
    timeLeftInMilliseconds(value) {
      // When the time is over we indicate the end of the playing state
      if (value <= 0) {
        this.$emit('state-ended');
      }
    },
  },
};
</script>

<style scoped></style>
