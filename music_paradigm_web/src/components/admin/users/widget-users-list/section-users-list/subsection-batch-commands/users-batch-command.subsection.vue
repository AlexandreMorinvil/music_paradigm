<template>
    <WidgetSubsectionContainer title="Batch commands">
        <div class="centering">
            <BatchCommandTargetFieldsetComponent />
            <BatchCommandParametersFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import BatchCommandParametersFieldsetComponent from './batch-command-parameters-fieldset.component.vue';
import BatchCommandTargetFieldsetComponent from './batch-command-target-fieldset.component.vue';

export default {
    components: {
        BatchCommandParametersFieldsetComponent,
        BatchCommandTargetFieldsetComponent,
        WidgetSubsectionContainer,
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
