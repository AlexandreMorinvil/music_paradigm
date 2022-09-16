<template>
	<div id="buttons-area" class="button-flex">
		<button
			v-if="isPrimaryButtonDisplayed"
			class="task-button"
			:class="isPrimaryButtonActive ? 'active' : 'innactive'"
			v-on:click="signalPrimaryButtonWasClicked"
		>
			{{ textPrimaryButton }}
		</button>
		<button
			v-if="isSecondaryButtonDisplayed"
			class="task-button"
			:class="isSecondaryButtonActive ? 'active' : 'innactive'"
			v-on:click="signalSecondaryButtonWasClicked"
		>
			{{ textSecondaryButton }}
		</button>
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
			// Main button
			isPrimaryButtonDisplayed: true,
			textPrimaryButton: 'Click',
			isPrimaryButtonActive: false,

			// Secondary Button
			isSecondaryButtonDisplayed: false,
			textSecondaryButton: 'Click',
			isSecondaryButtonActive: false,
		};
	},
	computed: {
		...mapGetters('experiment', ['isSkipButtonInMainOptions']),
	},
	methods: {
		// Main Button
		hidePrimaryButton() {
			this.isPrimaryButtonDisplayed = false;
		},
		showPrimaryButton() {
			this.isPrimaryButtonDisplayed = true;
		},
		setTextPrimaryButton(text) {
			this.textPrimaryButton = text || 'Click';
		},
		activatePrimaryButton() {
			this.isPrimaryButtonActive = true;
		},
		deactivatePrimaryButton() {
			this.isPrimaryButtonActive = false;
		},
		signalPrimaryButtonWasClicked() {
			if (this.isPrimaryButtonActive) this.$emit('clicked');
		},

		// Secondary Button
		hideSecondaryButton() {
			this.isSecondaryButtonDisplayed = false;
		},
		showSecondaryButton() {
			this.isSecondaryButtonDisplayed = true;
		},
		setTextSecondaryButton(text) {
			this.textSecondaryButton = text || 'Click';
		},
		activateSecondaryButton() {
			this.isSecondaryButtonActive = true;
		},
		deactivateSecondaryButton() {
			this.isSecondaryButtonActive = false;
		},
		signalSecondaryButtonWasClicked() {
			if (this.isSecondaryButtonActive) this.$emit('clickedSecond');
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
