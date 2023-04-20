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
import ButtonBatchPrependToNoteComponent from './buttons/button-batch-prepend-to-note.component.vue';

import { mapGetters } from 'vuex';


export default {
    components: {
        addTag: ButtonBatchAddTagComponent,
        appendToNote: ButtonBatchAppendToNoteComponent,
        prependToNote: ButtonBatchPrependToNoteComponent,
 
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
                case UsersBatchCommandsEnum.prependToNote: return 'prependToNote';
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
