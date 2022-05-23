<template>
	<div id="buttons-area" class="button-flex">
		<button class="task-button" :class="isActive ? 'active' : 'innactive'" v-on:click="signalButtonWasClicked">{{ text }}</button>
		<skip-button-component v-if="isSkipButtonInMainOptions" class="task-button" />
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';
import { mapGetters } from 'vuex';

import SkipButtonComponent from '@/components/experiment/element/skip-button.component.vue';


export default {
	components: {
		SkipButtonComponent,
	},
	data() {
		return {
			text: 'Click',
			isActive: false,
		};
	},
	computed: {
		...mapGetters('experiment', ['isSkipButtonInMainOptions']),
	},
	methods: {
		setText(text) {
			this.text = text || 'Click';
		},
		activate() {
			this.isActive = true;
		},
		deactivate() {
			this.isActive = false;
		},
		signalButtonWasClicked() {
			if (this.isActive) this.$emit('clicked');
		},
	},
};
</script>

<style scoped>
.button-flex {
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: stretch;
	flex-wrap: nowrap;
}

.active {
	color: white;
	background-color: rgb(0, 190, 50);
	border-color: rgb(0, 185, 45);
}

.innactive {
	color: rgb(85, 85, 85);
	background-color: rgb(150, 150, 150);
	border-color: rgb(145, 145, 145);
	cursor: default;
	outline: none;
}

.state-section {
	display: flex;
	justify-content: center;
	align-items: center;
	align-content: center;
}
</style>
