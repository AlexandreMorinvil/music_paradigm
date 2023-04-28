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
		<users-thorough-log-list-component :rules="rules" ref="thoroughLogsList" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import UsersThoroughLogListComponent from '@/components/admin/logs/users-thorough-log-list.widget.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		UsersThoroughLogListComponent,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('experiments', [
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
