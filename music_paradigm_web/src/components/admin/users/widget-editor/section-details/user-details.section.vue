<template>
    <WidgetSectionContainer title="User Details">
        <template v-slot:topRight>
            <ButtonDeselectUserComponent class="small"/>
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
import ButtonDeselectUserComponent from '../../buttons/button-deselect-user.component.vue';

export default {
    components: {
        ButtonDeselectUserComponent,
        UserAdditionalInformationSubsection,
        UserCredentialSubsection,
        UserDetailsSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped></style>
