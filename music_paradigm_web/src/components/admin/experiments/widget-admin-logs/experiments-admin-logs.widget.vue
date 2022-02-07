<template>
	<div id="experiments-user-logs" class="widget widget-bg">
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
		<admin-simple-log-list-component :rules="rules" ref="simpleLogsList" />
		<admin-thorough-log-list-component :rules="rules" ref="thoroughLogsList" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';

import AdminSimpleLogListComponent from '@/components/admin/logs/admin-simple-log-list.widget.vue';
import AdminThoroughLogListComponent from '@/components/admin/logs/admin-thorough-log-list.widget.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		AdminSimpleLogListComponent,
		AdminThoroughLogListComponent,
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
