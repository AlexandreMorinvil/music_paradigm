<template>
    <WidgetSubsectionContainer title="Additional Information">
        <div class="centering">
            <UserAdditionalInformationFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserAdditionalInformationFieldsetComponent from './user-additional-information-fieldset.component.vue';

export default {
    components: {
        UserAdditionalInformationFieldsetComponent,
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
