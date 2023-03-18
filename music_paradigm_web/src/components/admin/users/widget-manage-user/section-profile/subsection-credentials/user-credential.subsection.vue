<template>
    <WidgetSubsectionContainer title="Credentials">
        <div class="centering">
            <UserCredentialFieldsetComponent />
        </div>
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserCredentialFieldsetComponent from './user-credential-fieldset.component.vue';

export default {
    components: {
        UserCredentialFieldsetComponent,
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
