<template>
    <WidgetSectionContainer title="User Details">
        <template v-slot:topRight>
            <ButtonUnselectUserComponent class="small"/>
        </template>
        <UserDetailsSubsection />
        <UserCredentialSubsection />
        <UserAdditionalInformationSubsection />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import UserAdditionalInformationSubsection from './subsection-additional-information/user-additional-information.subsection.vue';
import UserCredentialSubsection from './subsection-credentials/user-credential.subsection.vue';
import UserDetailsSubsection from './subsection-details/user-details.subsection.vue';
import ButtonUnselectUserComponent from '../../buttons/button-unselect-user.component.vue';

export default {
    components: {
        ButtonUnselectUserComponent,
        UserAdditionalInformationSubsection,
        UserCredentialSubsection,
        UserDetailsSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped></style>
