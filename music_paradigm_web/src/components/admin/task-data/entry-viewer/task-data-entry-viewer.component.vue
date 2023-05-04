<template>
	<TemplateCodeEditor readOnly :assignedText="textToDisplay" />
</template>

<script>
import { mapGetters } from 'vuex';

import TemplateCodeEditor from '@/components/admin/template/template-code-editor.vue';

export default {
	components: {
		TemplateCodeEditor,
	},
	computed: {
		...mapGetters('managementTaskData/selection', ['taskDataEntrySelectionData']),
		textToDisplay() {
			return JSON.stringify(this.taskDataEntrySelectionData, null, '\t');
		},
	},
};
</script>

<style scoped></style>
