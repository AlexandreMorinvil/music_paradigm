<template>
	<admin-page-content-frame title="Users">
		<widget-content-frame-component title="Reviewer">
			<users-viewer />
		</widget-content-frame-component>

		<widget-content-frame-component title="User Editor">
			<users-editor-widget ref="editor" v-on:create-user="submitUserToCreate" />
		</widget-content-frame-component>

		<widget-content-frame-component title="Curriculum Handler" ref="curriculum">
			<users-curriculum-widget ref="userCurriculum" />
		</widget-content-frame-component>

		<widget-content-frame-component title="Overview Table">
			<users-table />
		</widget-content-frame-component>
	</admin-page-content-frame>
</template>

<script>
import AdminPageContentFrame from '@/components/content-frame/admin-page-content-frame.component.vue';
import UsersCurriculumWidget from '@/components/admin/users/widget-curriculum/users-curriculum.widget.vue';
import UsersEditorWidget from '@/components/admin/users/widget-editor/users-editor.widget.vue';
import UsersTable from '@/components/admin/users/UsersTableWidget.vue';
import UsersViewer from '@/components/admin/users/UsersViewerWidget.vue';
import WidgetContentFrameComponent from '@/components/content-frame/widget-content-frame.component.vue';

import { mapActions } from 'vuex';

export default {
	components: {
		AdminPageContentFrame: AdminPageContentFrame,
		WidgetContentFrameComponent,
		UsersViewer: UsersViewer,
		UsersCurriculumWidget,
		UsersEditorWidget,
		UsersTable: UsersTable,
	},
	methods: {
		...mapActions('users', ['createUser']),
		bundleUserInformation() {
			return {
				user: this.$refs.editor.bundleUserFromForm(),
				curriculum: this.$refs.userCurriculum.bundleUserCurriculumInformation(),
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
