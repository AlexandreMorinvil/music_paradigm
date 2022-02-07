<template>
	<form class="parameter-form form-area">
		<h3 class="log-type-title">Log Type</h3>
		<div class="log-type-area input">
			<select name="log-type" v-model="selectedLogType" v-on:change="updateLogType">
				<option v-for="(type, index) in logTypeOptions" :key="index" :value="setValidLogType(type)">
					{{ type }}
				</option>
			</select>
			<h3 class="log-tags-title">Tags</h3>
			<input v-model="insertedLogTag" v-on:change="updateLogTags" />
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
			insertedLogTag: '',
		};
	},
	components: {},
	computed: {
		...mapGetters('experiments', ['logType']),
		...mapGetters('session', ['tags']),
		logTypeOptions() {
			return log.logTypeOptions;
		},
		logTagsToSet() {
			return this.insertedLogTag ? [this.insertedLogTag] : [];
		},
	},
	methods: {
		...mapActions('experiments', ['setLogType', 'setTags']),
		setValidLogType(logType) {
			return log.returnValidLogType(logType);
		},
		updateLogType() {
			this.setLogType(this.selectedLogType);
		},
		updateLogTags() {
			console.log('Test START');
			this.setTags(this.logTagsToSet);
			console.log('Test END');
		},
	},
	beforeMount() {
		this.selectedLogType = this.logType;
		this.insertedLogTag = this.tags[0] || '';
	},
};
</script>

<style scoped>
.log-type-title {
	margin: 0 0 10px 0;
}

.log-tags-title {
	margin: 20px 0 10px 0;
}
</style>
