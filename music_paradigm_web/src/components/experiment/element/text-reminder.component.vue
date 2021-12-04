<template>
	<div>
		<p id="text-reminder" class="text-reminder">{{ textContent }}</p>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters('experiment', ['textReminder']),
		textContent() {
			return this.textReminder;
		},
	},
};
</script>

<style scoped>
.text-reminder {
	padding: 10px;
}
</style>
