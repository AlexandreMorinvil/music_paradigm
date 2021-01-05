<template>
	<button v-on:click="startDueSession" class="main-button">Run Today’s Session</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
	data() {
		return {};
	},
	methods: {
		...mapActions('session', ['fetchDueExperimentSession']),
		startDueSession() {
			this.fetchDueExperimentSession();
		},
	},
	computed: {
		...mapGetters('account', ['']),
	},
};
</script>

<style scoped></style>
