<template>
  <div id="playing-state" class="experiment-state-container" :class="gridClass">
    <img
      v-if="hasHelperImage"
      id="helper-img"
      :src="urlExperimentRessource(helperImageName)"
      alt="Helper"
      class="helper"
    />

    <skip-button v-if="hasSkipOption" class="skip-button" v-on:skipButtonClicked="emitSkipSignal" />

    <div v-if="hasText" id="text-area" class="experiment-state-division state-division-text">{{ textContent }}</div>

    <div id="visual-media-area" class="experiment-state-division state-division-visual-media">
      <component
        :is="playingMode"
        v-on:footnote="handleFootnote"
        v-on:finishedPlaying="handdleEndOfPlaying"
        ref="playingMode"
      />
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">{{ footnote }}</div>
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapActions, mapGetters } from 'vuex';

import PlayingSpeedComponent from './PlayingSpeed';
import PlayingRhythmComponent from './PlayingRhythm';
import PlayingMelodyComponent from './PlayingMelody';
import SkipButton from '@/components/experiment/SkipButton.vue';

export default {
  name: 'Playing',
  components: {
    skipButton: SkipButton,
    speed: PlayingSpeedComponent,
    rhythm: PlayingRhythmComponent,
    melody: PlayingMelodyComponent,
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
      footnote: 'The experiment will go to the next step after your performance',
    };
  },
  computed: {
    ...mapGetters(['urlExperimentRessource']),
    ...mapGetters('piano', ['hasSuccess']),
    ...mapGetters('experiment', [
      'hasText',
      'hasFootnote',
      'hasHelperImage',
      'hasSkipOption',
      'textContent',
      'helperImageName',
      'playingMode',
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
  },
  methods: {
    ...mapActions('experiment', ['addSuccess']),
    handleFootnote(footNote) {
      this.footnote = footNote;
    },
    handdleEndOfPlaying() {
      this.evaluatePlayedNotes();
      this.$emit('stateEnded');
    },
    evaluatePlayedNotes() {
      this.$refs.playingMode.evaluate();
      if(this.hasSuccess) this.addSuccess();
    },
    emitSkipSignal() {
      this.$emit('skipRequest');
    },
  },
  watch: {
    lastPressedKey(lastPressedKey) {
      if (this.hasSkipOption && lastPressedKey === this.skipStepButton) this.emitSkipSignal();
    },
  },
};
</script>

<style scoped></style>
