<template>
	<div>
		<component :is="type" ref="log" />
	</div>
</template>

<script>
import LogSimpleComponent from './log-simple.component.vue';
import LogThoroughComponent from './log-thorough.component.vue';

export default {
	components: {
		simple: LogSimpleComponent,
		thorough: LogThoroughComponent,
	},
	data() {
		return {};
	},
	computed: {
		type() {
			return 'simple';
		},
	},
	methods: {
		initialize() {
			if (this.$refs.log.initialize) this.$refs.log.initialize();
		},
		addBlock() {
			if (this.$refs.log.addBlock) this.$refs.log.addBlock();
		},
		conclude(isInTimeUp) {
			if (this.$refs.log.conclude) this.$refs.log.conclude(isInTimeUp);
		},
	},
};
</script>

<style scoped></style>
