<template>
	<img id="helper-image" :src="urlExperimentRessource(helperImageName)" alt="Helper" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['urlExperimentRessource']),
		...mapGetters('experiment', ['helperImageName']),
	},
};
</script>

<style scoped></style>
