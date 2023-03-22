<template>
    <WidgetSubsectionContainer title="Session Adjustments">
        <div class="centering">
            <ProgressionSessionDetailsFieldsetComponent />
        </div>
        <template v-slot:buttons>
            <ButtonAssignSessionAdjustmentsComponent />
        </template>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import ButtonAssignSessionAdjustmentsComponent from '../buttons/button-assign-session-adjustments.component.vue';
import ProgressionSessionDetailsFieldsetComponent from './progression-session-adjustments-fieldset.component.vue';

export default {
    components: {
        ButtonAssignSessionAdjustmentsComponent,
        ProgressionSessionDetailsFieldsetComponent,
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
