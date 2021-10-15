<template>
	<div id="text-area" class="state-section state-division-text">
		<button class="main-button" :class="isActive ? 'active' : 'innactive'" v-on:click="signalButtonWasClicked">{{ text }}</button>
	</div>
</template>

<script>
import '@/styles/experiment-content-template.css';

export default {
	data() {
		return {
			text: 'Click',
			isActive: false,
		};
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
.main-button {
	font-size: 1.5em;
	min-height: 100px;
	max-height: 120px;
	min-width: 400px;
	max-width: 9000px;
	background-color: rgb(0, 200, 255);
	box-shadow: 5px 10px 8px black;
	border-style: solid;
	border-width: 5px;
	border-radius: 5px;
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

.centering {
	width: 60%;
}
</style>
