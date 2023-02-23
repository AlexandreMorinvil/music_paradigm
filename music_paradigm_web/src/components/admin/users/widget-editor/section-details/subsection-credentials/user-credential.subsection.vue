<template>
    <WidgetSubsectionContainer title="Credentials">
        <UserCredentialFormComponent />
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserCredentialFormComponent from './user-credential-form.component.vue';

export default {
    components: {
        UserCredentialFormComponent,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>

</style>
