<template>
	<admin-page-content-frame title="Users">
		<widget-content-frame-component title="User Editor">
			<users-editor-widget ref="editor" v-on:create-user="submitUserToCreate" />
		</widget-content-frame-component>

		<widget-content-frame-component title="Curriculum Handler" ref="curriculum">
			<users-curriculum-widget ref="userCurriculum" />
		</widget-content-frame-component>

		<widget-content-frame-component :isShownInitial="false" title="Users Logs">
			<users-logs-widget />
		</widget-content-frame-component>

		<widget-content-frame-component title="Users List">
			<users-list />
		</widget-content-frame-component>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersCurriculumWidget from '@/components/admin/users/widget-curriculum/users-curriculum.widget.vue';
import UsersEditorWidget from '@/components/admin/users/widget-editor/users-editor.widget.vue';
import UsersList from '@/components/admin/users/widget-list/users-list.widget.vue';
import UsersLogsWidget from '@/components/admin/users/widget-logs/users-logs.widget.vue';
import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import { mapActions } from 'vuex';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrameComponent,
		UsersCurriculumWidget,
		UsersEditorWidget,
		UsersLogsWidget,
		UsersList,
	},
	methods: {
		...mapActions('managementUsers',['createUser']),
		bundleUserInformation() {
			return {
				user: this.$refs.editor.bundleUserFromForm(),
				...this.$refs.userCurriculum.bundleUserCurriculumInformation(),
			};
		},
		submitUserToCreate() {
			const userToCreate = this.bundleUserInformation();
			this.createUser(userToCreate);
		},
	},
};
</script>

<style scoped></style>
