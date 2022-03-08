<template>
	<div id="pvt-count-up">
		<span class="too-early-text"> {{ message }} </span>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['pvtTooEarlyMessage']),
		message() {
			return this.pvtTooEarlyMessage ? this.pvtTooEarlyMessage : '&#x2715;';
		},
	},
};
</script>

<style scoped>
.pvt-center-element {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 3em;
}

.too-early-text {
	font-size: 2em;
}
</style>
