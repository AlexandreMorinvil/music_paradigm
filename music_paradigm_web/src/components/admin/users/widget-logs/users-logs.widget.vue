<template>
	<div id="users-logs" class="widget widget-bg">
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
		...mapGetters('users', ['userSelectedId', 'userSelectedProgressionId']),
		user() {
			return [this.userSelectedId];
		},
		progresion() {
			return [this.userSelectedProgressionId];
		},
		associativeId() {
			return null; // this.associativeIdList
		},
		completionCount() {
			return null;
		},
		rules() {
			return {
				userIdList: this.user,
				progressionIdList: this.progresion,
				associativeIdList: this.associativeId,
				minCompletionCount: this.completionCount,
				maxCompletionCount: this.completionCount,
			};
		},
	},
	methods: {},
};
</script>

<style scoped></style>
