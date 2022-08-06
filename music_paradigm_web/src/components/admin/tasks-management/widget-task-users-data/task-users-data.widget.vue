<template>
	<div id="experiments-users-logs" class="widget widget-bg">
		<h3 style="text-align: center">
			<span v-if="hasExperimentSelection"
				>GROUP=<span class="selected-element-text"> {{ experimentsGroupDisplay }} </span>
			</span>
			<span v-if="hasExperimentSelection"
				>/ NAME=<span class="selected-element-text"> {{ experimentsNameDisplay }} </span>
			</span>
			<span v-if="hasExperimentSelection"
				>/ VERSION=<span class="selected-element-text"> {{ experimentsVersionDisplay }}</span
				>
			</span>
		</h3>
		<users-simple-log-list-component :rules="rules" ref="simpleLogsList" />
		<users-thorough-log-list-component :rules="rules" ref="thoroughLogsList" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import UsersSimpleLogListComponent from '@/components/admin/logs/users-simple-log-list.widget.vue';
import UsersThoroughLogListComponent from '@/components/admin/logs/users-thorough-log-list.widget.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		UsersSimpleLogListComponent,
		UsersThoroughLogListComponent,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('management/tasks', [
			'selectedId',
			'hasExperimentSelection',
			'experimentsSelectedGroup',
			'experimentsSelectedName',
			'experimentsSelectedVersion',
		]),
		experimentsGroupDisplay() {
			return this.experimentsSelectedGroup;
		},
		experimentsNameDisplay() {
			return this.experimentsSelectedName;
		},
		experimentsVersionDisplay() {
			return this.experimentsSelectedVersion;
		},
		experimentsRule() {
			return [this.selectedId];
		},
		rules() {
			return {
				experimentIdList: this.experimentsRule,
			};
		},
	},
};
</script>

<style scoped></style>
