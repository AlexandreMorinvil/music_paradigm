<template>
	<TemplateFieldsetComponent>

		<TemplateFieldLabelComponent for="title" text="Group" />
		<TemplateFieldInputComponent v-bind:value="userEditionGroup" v-on:edit="editUserEditionGroup"
			:datalist="usersExistingUserGroupsList" :inputAttributes="{
				type: 'text',
				name: 'group',
				autocomplete: 'off',
				placeholder: 'Insert group'
			}" />

		<TemplateFieldLabelComponent for="text" text="Note" />
		<TemplateFieldTextareaComponent v-bind:value="userEditionNote" v-on:edit="editUserEditionNote" :textAreaAttributes="{
			maxlength: 1000,
			name: 'note',
			placeholder: 'Take notes about the use in this field',
			rows: 4
		}" />

		<TemplateFieldLabelComponent for="title" text="Tags" />
		<div v-for="(tag, index) in userEditionTags" :key="index" class="tag-input-area">
			<TemplateFieldInputComponent v-bind:value="tag" v-on:edit="(editedTag) => editTag(editedTag, index)"
				:inputAttributes="{
					type: 'text',
					name: `tag ${index + 1}`,
					autocomplete: 'off',
					placeholder: 'Insert tag'
				}" />
			<TemplateButtonComponent color="red" isSmall v-on:click="() => deleteTag(index)" text="Delete" />
		</div>
		<TemplateButtonComponent class="grid-right-align" color="blue" isSmall v-on:click="addTag" text="Add Tag" />
	</TemplateFieldsetComponent>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import TemplateButtonComponent from '@/components/admin/templates/template-button.component.vue';
import TemplateFieldInputComponent from '@/components/admin/templates/template-field-input.component.vue';
import TemplateFieldLabelComponent from '@/components/admin/templates/template-field-label.component.vue';
import TemplateFieldsetComponent from '@/components/admin/templates/template-fieldset.component.vue';
import TemplateFieldTextareaComponent from '@/components/admin/templates/template-field-textarea.component.vue';

export default {
	components: {
		TemplateButtonComponent,
		TemplateFieldInputComponent,
		TemplateFieldLabelComponent,
		TemplateFieldsetComponent,
		TemplateFieldTextareaComponent,
	},
	computed: {
		...mapGetters('managementUsers', ['usersExistingUserGroupsList']),
		...mapGetters('managementUsers/edition', [
			'userEditionGroup',
			'userEditionNote',
			'userEditionTags',
		]),
	},
	methods: {
		...mapActions('managementUsers', ['getExistingUserGroupsList']),
		...mapActions('managementUsers/edition', [
			'addUserEditionTag',
			'deleteUserEditionTag',
		]),
		...mapMutations('managementUsers/edition', [
			'editUserEditionGroup',
			'editUserEditionNote',
			'editUserEditionTag',
		]),
		addTag() {
			this.addUserEditionTag();
		},
		deleteTag(index) {
			this.deleteUserEditionTag(index);
		},
		editTag(editedTag, index) {
			this.editUserEditionTag({ tag: editedTag, index: index })
		},
	},
	beforeMount() {
		this.getExistingUserGroupsList();
	},
};
</script>

<style scoped>
.tag-input-area {
	display: grid;
	grid-template-columns: 4fr 1fr;
	grid-column: 2;
}

.grid-right-align {
	grid-column: 2;
}
</style>
