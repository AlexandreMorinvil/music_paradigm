<template>
	<div id="users-logs" class="widget widget-bg">
		<h3 style="text-align: center">
			<span v-if="hasSelectedUser"
				>USERNAME=<span class="selected-element-text"> {{ userRuleDisplay }} </span>
			</span>
			<span v-if="hasSelectedProgressionSession"
				>/ASSOCIATIVE ID=<span class="selected-element-text"> {{ associativeIdRuleDisplay }} </span>
			</span>
			<span v-if="hasSelectedSessionCompletionCount"
				>/COMPLETIONS=<span class="selected-element-text"> {{ completionCountRuleDisplay }}</span
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
		...mapGetters('managementUsers/selection', [
			'hasSelectedUser',
			'userSelectionId', 
			'userSelectionUsername', 
		]),
		...mapGetters('managementUsers/progressions/selection', [
			'userProgressionSelectionId',
		]),
		...mapGetters('managementUsers/progressions/sessions/selection', [
			'hasSelectedProgressionSession',
			'hasSelectedSessionCompletionCount',
			'progressionSessionSelectionAssociativeId',
			'sessionCompletionCountSelection',
		]),
		userRuleDisplay() {
			return this.userSelectionUsername;
		},
		associativeIdRuleDisplay() {
			return this.progressionSessionSelectionAssociativeId;
		},
		completionCountRuleDisplay() {
			return this.sessionCompletionCountSelection;
		},
		userRule() {
			return [this.userSelectionId];
		},
		associativeIdRule() {
			return this.progressionSessionSelectionAssociativeId ? [this.progressionSessionSelectionAssociativeId] : null;
		},
		completionCountRule() {
			return typeof this.sessionCompletionCountSelection === 'number' ? [this.sessionCompletionCountSelection] : null;
		},
		rules() {
			return {
				userIdList: this.userRule,
				associativeIdList: this.associativeIdRule,
				minCompletionCount: this.associativeIdRule,
				completionCountList: this.completionCountRule,
			};
		},
	},
	methods: {},
};
</script>

<style scoped></style>
