<template>
	<button v-on:click="startDueSession" class="main-button" :class="isActive ? 'active' : 'innactive'">{{ message }}</button>
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
			if (this.isActive) this.fetchDueExperimentSession();
		},
	},
	computed: {
		...mapGetters('account', ['hasDueExperiment']),
		message() {
			if (this.isActive) return this.$t('user.home.run-today-session');
			return this.$t('user.home.today-session-unavailable');
		},
		isActive() {
			return this.hasDueExperiment;
		},
	},
};
</script>

<style scoped>
.main-button {
	font-size: 2em;
	min-height: 130px;
	max-height: 150px;
	min-width: 500px;
	max-width: 1000px;
	background-color: rgb(0, 200, 255);
	box-shadow: 5px 10px 8px black;
	border-style: solid;
	border-width: 5px;
}

.active {
	color: white;
	background-color: rgb(200, 180, 0);
	border-color: rgb(195, 175, 0);
}

.innactive {
	color: rgb(85, 85, 85);
	background-color: rgb(150, 150, 150);
	border-color: rgb(145, 145, 145);
	cursor: default;
	outline: none;
}
</style>
