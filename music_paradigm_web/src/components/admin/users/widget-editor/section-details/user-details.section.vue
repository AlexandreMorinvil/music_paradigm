<template>
    <WidgetSectionContainer title="User Details">
        <UserCredentialSubsection />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import UserCredentialSubsection from './subsection-credentials/user-credential.subsection.vue';

export default {
    components: {
        UserCredentialSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped>

</style>
