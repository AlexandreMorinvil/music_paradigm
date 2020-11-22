<template>
  <button v-on:click="emitSkipSignal">{{ buttonMessage }}</button>
</template>

<script>
import { mapGetters } from 'vuex';
import { ExperimentEventBus } from '@/_services/eventBus.service.js';

export default {
  name: 'Alert',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('experiment', ['skipStepButton', 'skipStepButtonMessage']),
    skipStepButtonValue() {
      return this.skipStepButton.toUpperCase();
    },
    buttonMessage() {
      if (!this.skipStepButtonMessage) return 'Press ' + this.skipStepButtonValue + ' to skip';
      return this.skipStepButtonMessage;
    },
  },
  methods: {
    emitSkipSignal() {
      ExperimentEventBus.$emit('skip-request');
    },
    verifySkipButton(event) {
      if (event.key.toUpperCase() === this.skipStepButtonValue) this.emitSkipSignal();
    },
  },
  mounted() {
    window.addEventListener('keydown', this.verifySkipButton);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.verifySkipButton);
  },
};
</script>

<style scoped>
button {
  font-size: calc(0.6vh + 0.6vw);
  background-color: rgb(200, 200, 200);
  border: 3px solid rgb(150, 150, 150);
  border-radius: 10px;
  padding-top: auto;
  margin: 10px;
}
</style>
