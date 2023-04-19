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

import ButtonBatchAddTag from './buttons/button-batch-add-tag.component.vue'
import { mapGetters } from 'vuex';


export default {
    components: {
        addTag: ButtonBatchAddTag,

        BatchCommandParametersFieldsetComponent,
        BatchCommandTargetFieldsetComponent,
        WidgetSubsectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/batchCommand', ['usersBatchCommand']),
        buttonComponent() {
            switch (this.usersBatchCommand) {
                case UsersBatchCommandsEnum.addTag: return 'addTag';
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
