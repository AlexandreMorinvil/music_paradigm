<template>
    <WidgetSectionContainer title="User Details">
        <template v-slot:topRight>
            <ButtonRevertUserChangesComponent class="small"/>
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
import ButtonRevertUserChangesComponent from '../buttons/button-revert-user-changes.component.vue';

export default {
    components: {
        ButtonDeselectUserComponent,
        ButtonRevertUserChangesComponent,
        UserAdditionalInformationSubsection,
        UserCredentialSubsection,
        UserDetailsSubsection,
        WidgetSectionContainer,
    }
};
</script>

<style scoped></style>
