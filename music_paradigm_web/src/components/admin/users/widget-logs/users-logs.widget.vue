<template>
	<div id="users-logs" class="widget widget-bg">
		<users-simple-log-list-component :rules="rules" ref="simpleLogsList" />
	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
// import { mapActions, mapGetters } from 'vuex';

import UsersSimpleLogListComponent from '@/components/admin/logs/users-simple-log-list.widget.vue';
import { mapGetters } from 'vuex';

export default {
	components: {
		UsersSimpleLogListComponent,
	},
	data() {
		return {};
	},
	computed: {
		...mapGetters('users', ['hasSelectedUser', 'userSelectedId']),
		rules() {
			return {
				userIdList: [this.userSelectedId],
			};
		},
	},
	methods: {},
};
</script>

<style scoped></style>
