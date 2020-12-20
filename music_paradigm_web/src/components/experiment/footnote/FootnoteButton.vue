<template>
  <div class="button-grid">
    <button v-on:click="emitAdvanceSignal">{{ message }}</button>
    <skip-button />
  </div>
</template>

<script>
import{ mapGetters } from'vuex';
import{ ExperimentEventBus } from'@/_services/eventBus.service.js';
import SkipButton from'@/components/experiment/SkipButton.vue';

export default{
	'name': 'FootnoteButton',
	'components': {
		'skipButton': SkipButton
	},
	'props': {
		'message': {
			'type': String,
			default() {
				return'';
			}
		}
	},
	data() {
		return{};
	},
	'computed': {
		...mapGetters('experiment', ['skipStepButton', 'skipStepButtonMessage'])
	},
	'methods': {
		emitAdvanceSignal() {
			ExperimentEventBus.$emit('advance-request');
		}
	}
};
</script>

<style scoped>
.button-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

button {
  font-size: calc(0.85vh + 0.85vw);
  background-color: rgb(200, 200, 200);
  border: 3px solid rgb(150, 150, 150);
  border-radius: 10px;
  /* padding-top: auto; */
  margin: 10px;
  width: initial;
  height: initial;
}
</style>
