<template>
	<div>
		<component :is="type" ref="log" />
	</div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { log } from '@/_helpers';

import LogNoneComponent from './log-none.component.vue';
import LogThoroughComponent from './log-thorough.component.vue';

export default {
	components: {
		none: LogNoneComponent,
		thorough: LogThoroughComponent,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('log', ['logType']),
		type() {
			return log.returnValidLogType(this.logType);
		},
	},
	methods: {
		...mapActions('log', ['clearLogSpecifications']),
		initialize() {
			if (this.$refs.log.initialize) this.$refs.log.initialize();
		},
		addBlock() {
			if (this.$refs.log.addBlock) this.$refs.log.addBlock();
		},
		conclude() {
			if (this.$refs.log.conclude) this.$refs.log.conclude();
			this.clearLogSpecifications();
		},
	},
};
</script>

<style scoped></style>
