<template>
    <WidgetSubsectionContainer title="Batch commands">
        <div class="centering">
            <BatchCommandTargetFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import BatchCommandTargetFieldsetComponent from './batch-command-target-fieldset.component.vue';

export default {
    components: {
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
}
</style>
