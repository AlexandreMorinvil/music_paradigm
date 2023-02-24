<template>
    <WidgetSectionContainer title="User Details">
        <UserCredentialSubsection />
        <UserAdditionalInformationSubsection />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import UserAdditionalInformationSubsection from './subsection-additional-information/user-additional-information.subsection.vue';
import UserCredentialSubsection from './subsection-credentials/user-credential.subsection.vue';

export default {
    components: {
        UserAdditionalInformationSubsection,
        UserCredentialSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped>

</style>
