<template>
    <WidgetSubsectionContainer title="Batch commands">
        <div class="centering">
            <BatchCommandTargetFieldsetComponent />
            <BatchCommandParametersFieldsetComponent />
        </div>
        <template v-slot:buttons>
            <component :is="buttonComponent" />
        </template>
    </WidgetSubsectionContainer>
</template>

<script>
import { UsersBatchCommandsEnum } from '@/modules/users';
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import BatchCommandParametersFieldsetComponent from './batch-command-parameters-fieldset.component.vue';
import BatchCommandTargetFieldsetComponent from './batch-command-target-fieldset.component.vue';

import ButtonBatchAddTagComponent from './buttons/button-batch-add-tag.component.vue'
import ButtonBatchAppendToNoteComponent from './buttons/button-batch-append-to-note.component.vue';
import ButtonBatchDeleteUsersComponent from './buttons/button-batch-delete-users.component.vue';
import ButtonBatchPrependToNoteComponent from './buttons/button-batch-prepend-to-note.component.vue';
import ButtonBatchRemoveAllTagsComponent from './buttons/button-batch-remove-all-tags.component.vue';
import ButtonBatchRemoveTagComponent from './buttons/button-batch-remove-tag.component.vue';
import ButtonBatchSetGroupComponent from './buttons/button-batch-set-group.component.vue';
import ButtonBatchSetNoteComponent from './buttons/button-batch-set-note.component.vue';

import { mapGetters } from 'vuex';


export default {
    components: {
        addTag: ButtonBatchAddTagComponent,
        appendToNote: ButtonBatchAppendToNoteComponent,
        deleteUsers: ButtonBatchDeleteUsersComponent,
        prependToNote: ButtonBatchPrependToNoteComponent,
        removeAllTags: ButtonBatchRemoveAllTagsComponent,
        removeTag: ButtonBatchRemoveTagComponent,
        setGroup: ButtonBatchSetGroupComponent,
        setNote: ButtonBatchSetNoteComponent,
 
        BatchCommandParametersFieldsetComponent,
        BatchCommandTargetFieldsetComponent,
        WidgetSubsectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/batchCommand', ['usersBatchCommand']),
        buttonComponent() {
            switch (this.usersBatchCommand) {
                case UsersBatchCommandsEnum.addTag: return 'addTag';
                case UsersBatchCommandsEnum.appendToNote: return 'appendToNote';
                case UsersBatchCommandsEnum.deleteUsers: return 'deleteUsers';
                case UsersBatchCommandsEnum.prependToNote: return 'prependToNote';
                case UsersBatchCommandsEnum.removeAllTags: return 'removeAllTags';
                case UsersBatchCommandsEnum.removeTag: return 'removeTag';
                case UsersBatchCommandsEnum.setGroup: return 'setGroup';
                case UsersBatchCommandsEnum.setNote: return 'setNote';
                default: return '';
            }
        },
    },
};
</script>

<style scoped>
.centering {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
}
</style>
