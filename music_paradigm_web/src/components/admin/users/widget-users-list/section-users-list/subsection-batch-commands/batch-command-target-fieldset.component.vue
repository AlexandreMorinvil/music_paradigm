<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="Selected Users" />
		<TemplateFieldOutputComponent :value="usernameListingText" :complementaryValue="selectedUsersCountText" />

		<TemplateFieldLabelComponent text="Action" />
		<TemplateFieldSelectComponent :value="usersBatchCommand" v-on:edit="setUsersBatchCommand" isEmptyAccepted
			:options="possibleCommandsList" placeholder="No action" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

import TemplateFieldLabelComponent from '@/components/admin/template/template-field-label.component.vue';
import TemplateFieldOutputComponent from '@/components/admin/template/template-field-output.component.vue';
import TemplateFieldsetComponent from '@/components/admin/template/template-fieldset.component.vue';
import TemplateFieldSelectComponent from '@/components/admin/template/template-field-select.component.vue';

import { UsersBatchCommandsEnum } from '@/modules/users';

export default {
	components: {
		TemplateFieldLabelComponent,
		TemplateFieldOutputComponent,
		TemplateFieldsetComponent,
		TemplateFieldSelectComponent,
	},
	computed: {
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommand']),
		...mapGetters('managementUsers/listTableSelection', [
			'usersListTableSelectionCount',
			'usersListTableSelectionUsernamesList',
		]),
		possibleCommandsList() {
			return Object.values(UsersBatchCommandsEnum);
		},
		selectedUsersCountText() {
			if (this.usersListTableSelectionCount) return `(${this.usersListTableSelectionCount})`;
			else return null;
		},
		usernameListingText() {
			const selectedUsernamesList = this.usersListTableSelectionUsernamesList;
			const suspensionPoints = selectedUsernamesList.length > 5 ? ' ...' : '';
			return selectedUsernamesList.slice(0, 5).join(', ') + suspensionPoints;
		},
	},
	methods: {
		...mapActions('managementUsers/batchCommand', ['setUsersBatchCommand']),
	},
};
</script>

<style scoped></style>
