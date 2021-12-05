<template>
	<div id="text-area" class="state-section">
		<sound-generator-component />
		<div>
			<button class="midi-choice">1</button>
		</div>
		<p v-if="hasSpecification" class="specification-text">{{ textContent }}</p>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import SoundGeneratorComponent from '@/components/application-component/sound-generator.component.vue';

export default {
	components: {
		SoundGeneratorComponent,
	},
	data() {
		return {
			piano: null,
		};
	},
	computed: {
		...mapGetters('experiment', ['textSpecification']),
		hasSpecification() {
			return Boolean(this.textSpecification);
		},
		textContent() {
			return this.textSpecification;
		},
		hasMidi() {
			return Boolean(this.textSpecification);
		},
	},
	// beforeMount() {},
	// mounted() {},
};
</script>

<style scoped>
.specification-text {
	margin: 20px;
}

.midi-choice {
	border: none;
	width: 125px;
	height: 125px;
}

.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
	flex-direction: column;

	background-color: rgb(245, 245, 245);
}
</style>
