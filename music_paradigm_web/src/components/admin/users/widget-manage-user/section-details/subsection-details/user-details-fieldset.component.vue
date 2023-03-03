<template>
	<TemplateFieldsetComponent>
		<TemplateFieldLabelComponent text="User" />
		<TemplateFieldOutputComponent :value="username" />

		<TemplateFieldLabelComponent text="Creation" />
		<TemplateFieldOutputComponent :value="creationDate" />

		<!-- TODO: Implementing a mechanism to make the users log in each time they load the application
						Even though they do not necessarily enter their username and password. (Once this mechanism
						exists and the 'lastLogin' field of a user record is updated accordingly, then it will make
						sense to expose this output field)
			<TemplateFieldLabelComponent text="Last Login" />
			<TemplateFieldOutputComponent :value="lastLoginDate" /> -->

		<TemplateFieldLabelComponent text="Last Details Modification" />
		<TemplateFieldOutputComponent :value="updateDate" />
	</TemplateFieldsetComponent>
</template>

<script>
import { dateHandler } from '@/_helpers';
import { mapGetters } from 'vuex';


import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';
import TemplateFieldOutputComponent from '@/components/admin/templates/template-field-output.component.vue';

export default {
	components: {
		TemplateFieldLabelComponent,
		TemplateFieldOutputComponent,
		TemplateFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/selection', [
			'hasSelectedUser',
			'userSelectionUsername',
			'userSelectionCreatedAt',
			'userSelectionLastLogin',
			'userSelectionUpdatedAt',
		]),
		creationDate() {
			return this.isValueDisplayable(this.userSelectionCreatedAt) ?
				dateHandler.formatDateYearToMinutes(this.userSelectionCreatedAt) :
				null;
		},
		lastLoginDate() {
			return this.isValueDisplayable(this.userSelectionLastLogin) ?
				dateHandler.formatDateYearToMinutes(this.userSelectionLastLogin) :
				null;
		},
		updateDate() {
			return this.isValueDisplayable(this.userSelectionUpdatedAt) ?
				dateHandler.formatDateYearToMinutes(this.userSelectionUpdatedAt) :
				null;
		},
		username() {
			return this.isValueDisplayable(this.userSelectionUsername) ?
				this.userSelectionUsername :
				null;
		},
	},
	methods: {
		isValueDisplayable(value) {
			return this.hasSelectedUser && Boolean(value);
		},
	}
};
</script>

<style scoped></style>
