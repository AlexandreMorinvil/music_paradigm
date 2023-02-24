<template>
    <WidgetSubsectionContainer title="Additional Information">
        <UserAdditionalInformationFormComponent />
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserAdditionalInformationFormComponent from './user-additional-information-form.component.vue';

export default {
    components: {
        UserAdditionalInformationFormComponent,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>

</style>
