<template>
  <button v-on:click="emitSkipSignal">Press {{ skipStepButtonValue }} {{ buttonMessage }}</button>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'Alert',
  data() {
    return {};
  },
  computed: {
    ...mapGetters('experiment', ['skipStepButton', 'skipStepButtonMessage']),
    skipStepButtonValue() {
      return this.skipStepButton.toUpperCase() || 'Here';
    },
    buttonMessage() {
      if (!this.skipStepButtonMessage) return 'To skip';
      return this.skipStepButtonMessage || 'This is displayed';
    },
  },
  methods: {
    emitSkipSignal() {
      this.$emit('skipButtonClicked');
    },
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
