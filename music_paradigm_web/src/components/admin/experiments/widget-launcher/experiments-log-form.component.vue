<template>
	<form class="parameter-form form-area">
		<h3 class="log-type-title">Log Type</h3>
		<div class="log-type-area input">
			<select name="log-type" v-model="selectedLogType" v-on:change="updateLogType">
				<option v-for="(type, index) in logTypeOptions" :key="index" :value="setValidLogType(type)">
					{{ type }}
				</option>
			</select>
		</div>
	</form>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
import { mapActions, mapGetters } from 'vuex';
import { log } from '@/_helpers';

export default {
	data() {
		return {
			selectedLogType: '',
		};
	},
	components: {},
	computed: {
		...mapGetters('experiments', ['logType']),
		logTypeOptions() {
			return log.logTypeOptions;
		},
	},
	methods: {
		...mapActions('experiments', ['setLogType']),
		setValidLogType(logType) {
			return log.returnValidLogType(logType);
		},
		updateLogType() {
			this.setLogType(this.selectedLogType);
		},
	},
	beforeMount() {
		this.selectedLogType = this.logType;
	},
};
</script>

<style scoped>
.log-type-title {
	margin: 0 0 10px 0;
}
</style>
