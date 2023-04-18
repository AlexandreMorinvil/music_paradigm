<template>
	<div class="batch-command-parameters-area">
		<CommandPasswordFieldsetComponent v-if="involvesPassword" />
		<CommandGroupFieldsetComponent v-if="involvesGroup" />
		<CommandNoteFieldsetComponent v-if="involvesNote" />
		<CommandTagFieldsetComponent v-if="involvesTag" />
		<CommandCurriculumFieldsetComponent v-if="involvesCurriculum" :isFrozen="mustHaveSetCurriculum" />
		<!-- assignParameters -->
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

import { UsersBatchCommandsEnum } from '@/modules/users';

import CommandCurriculumFieldsetComponent from './command-curriculum-fieldset.component.vue';
import CommandGroupFieldsetComponent from './command-group-fieldset.component.vue';
import CommandNoteFieldsetComponent from './command-note-fieldset.component.vue';
import CommandPasswordFieldsetComponent from './command-password-fieldset.component.vue';
import CommandTagFieldsetComponent from './command-tag-fieldset.component.vue';

export default {
	components: {
		CommandCurriculumFieldsetComponent,
		CommandGroupFieldsetComponent,
		CommandNoteFieldsetComponent,
		CommandPasswordFieldsetComponent,
		CommandTagFieldsetComponent,
	},
	computed: {
		...mapGetters('managementUsers/batchCommand', ['usersBatchCommand']),
		involvesCurriculum() {
			return [UsersBatchCommandsEnum.assignCurriculum, UsersBatchCommandsEnum.assignParameters]
				.includes(this.usersBatchCommand);
		},
		involvesGroup() {
			return [UsersBatchCommandsEnum.setGroup]
				.includes(this.usersBatchCommand);
		},
		involvesNote() {
			return [UsersBatchCommandsEnum.appendToNote, UsersBatchCommandsEnum.prependToNote, UsersBatchCommandsEnum.setNote]
				.includes(this.usersBatchCommand);
		},
		involvesPassword() {
			return [UsersBatchCommandsEnum.setPassword]
				.includes(this.usersBatchCommand);
		},
		involvesTag() {
			return [UsersBatchCommandsEnum.addTag, UsersBatchCommandsEnum.removeTag]
				.includes(this.usersBatchCommand);
		},
		mustHaveSetCurriculum() {
			return this.usersBatchCommand === UsersBatchCommandsEnum.assignParameters;
		},
	},
};

</script>

<style scoped>
.batch-command-parameters-area {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: 5px;
}
</style>
