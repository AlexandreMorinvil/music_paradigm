<template>
	<img id="helper-image" :src="urlExperimentResource(helperImageName)" alt="Helper" />
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['urlExperimentResource']),
		...mapGetters('experiment', ['helperImageName']),
	},
};
</script>

<style scoped></style>
