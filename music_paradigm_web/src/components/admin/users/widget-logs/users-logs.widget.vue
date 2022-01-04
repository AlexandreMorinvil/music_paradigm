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
		...mapGetters('users', ['userSelectedId', 'userSelectedUsername', 'hasSelectedUser']),
		...mapGetters('users/progressions', [
			'progressionSelectedId',
			'sessionSelectedAssociativeId',
			'sessionCompletionCountSelected',
			'hasSelectedProgressionSession',
			'hasSelectedSessionCompletionCount',
		]),
		userRuleDisplay() {
			return this.userSelectedUsername;
		},
		associativeIdRuleDisplay() {
			return this.sessionSelectedAssociativeId;
		},
		completionCountRuleDisplay() {
			return this.sessionCompletionCountSelected;
		},
		userRule() {
			return [this.userSelectedId];
		},
		associativeIdRule() {
			return this.sessionSelectedAssociativeId ? [this.sessionSelectedAssociativeId] : null;
		},
		completionCountRule() {
			return typeof this.sessionCompletionCountSelected === 'number' ? [this.sessionCompletionCountSelected] : null;
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
