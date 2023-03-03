<template>
	<button class="widget-button" :class="{
		[color]: isActive,
		inactive: !isActive,
		small: isSmall
	}" v-on:click="(event) => handleClick(event)">
		{{ text }}
	</button>
</template>

<script>
import '@/styles/field-template.css';

export default {
	emits: ['click'],
	props: {
		color: {
			type: String,
			default: 'blue',
		},
		isActive: {
			type: Boolean,
			default: true,
		},
		isSmall: {
			type: Boolean,
			default: false,
		},
		text: {
			type: String,
			default: '',
		},
	},
	methods: {
		handleClick(event) {
			if (!this.isActive) return;
			this.$emit('click', event);
		}
	}
};
</script>

<style scoped>
</style>
