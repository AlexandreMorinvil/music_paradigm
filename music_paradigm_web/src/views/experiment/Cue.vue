<template>
  <div id="cue-state" class="experiment-state-container" :class="gridClass">
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
      <img id="cue-img" v-else :src="urlExperimentRessource(pictureName)" alt="Cue" />
    </div>

    <div id="note-area" v-if="hasFootnote" class="experiment-state-division state-division-text">{{ footnote }}</div>
  </div>
</template>

<script>
import '@/styles/experimentStateTemplate.css';
import { mapActions, mapGetters } from 'vuex';
import VisualPiano from '@/components/VisualPiano.vue';

export default {
  name: 'Cue',
  components: {
    visualPiano: VisualPiano,
  },
  data() {
    return {
      errorAutomaticTransitionSeconds: 5,
      playbackDelayInSeconds: 1,
    };
  },
  computed: {
    ...mapGetters(['urlExperimentRessource']),
    ...mapGetters('piano', ['isMidiFileLoaded']),
    ...mapGetters('experiment', [
      'midiName',
      'hasNoContent',
      'hasInteractivePiano',
      'hasText',
      'hasVisualMedia',
      'hasFootnote',
      'hasHelperImage',
      'pictureName',
      'textContent',
      'helperImageName',
    ]),
    gridClass() {
      if (this.hasFootnote) {
        if (this.hasText && this.hasVisualMedia) return 'grid-area-big-area-note';
        else return 'grid-area-note';
      } else {
        if (this.hasText && this.hasVisualMedia) return 'grid-area-big-area';
        else return 'grid-single-area';
      }
    },
    footnote() {
      var noteMessage;
      if (this.midiName === '')
        noteMessage = `There is no melody to be played, the experiment will automatically  go to the next step in ${
          this.errorAutomaticTransitionSeconds
        } seconds`;
      else noteMessage = `The experiment will automatically go to the next step after the muscial cue`;
      return noteMessage;
    },
    textToDisplay() {
      if (this.hasNoContent) return 'Cue';
      else return this.textContent;
    },
  },
  methods: {
    ...mapActions('piano', ['playMidiFile', 'addPlayerEndOfFileAction', 'removePlayerEndOfFileAction']),
    handleEndOfMidiFile() {
      this.$emit('stateEnded');
    },
    manageHavingNoMidiFile() {
      this.$emit('stateEnded');
    },
  },
  mounted() {
    this.addPlayerEndOfFileAction(this.handleEndOfMidiFile);
  },
  beforeDestroy() {
    this.removePlayerEndOfFileAction(this.handleEndOfMidiFile);
  },
  watch: {
    isMidiFileLoaded: {
      immediate: true,
      handler: function(isReady) {
        if (isReady) setTimeout(() => this.playMidiFile(), this.playbackDelayInSeconds * 1000);
        else if (this.midiName === '')
          setTimeout(() => this.manageHavingNoMidiFile(), this.errorAutomaticTransitionSeconds * 1000);
      },
    },
  },
};
</script>

<style scoped></style>
