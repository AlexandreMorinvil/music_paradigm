<template>
	<div id="users-logs" class="widget widget-bg">

		<users-simple-log-list-component ref="editorForm" />

	</div>
</template>

<script>
import '@/styles/widget-template.css';
import '@/styles/form-template.css';
// import { mapActions, mapGetters } from 'vuex';

import UsersSimpleLogListComponent from '@/components/admin/logs/users-simple-log-list.widget.vue';

export default {
	components: {
		UsersSimpleLogListComponent,
	},
	data() {
		return {};
	},
	computed: {},
	methods: {},
};
</script>

<style scoped>
</style>
