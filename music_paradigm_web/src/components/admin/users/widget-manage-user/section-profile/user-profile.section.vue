<template>
    <WidgetSectionContainer title="User Profile">
        <template v-slot:topRight>
            <ButtonRevertUserChangesComponent :isSmall="true" />
            <ButtonDeselectUserComponent :isSmall="true" />
        </template>
        
        <UserDetailsSubsection v-if="hasSelectedUser"/>
        <UserCredentialSubsection />
        <UserAdditionalInformationSubsection />

        <template v-slot:buttons>
            <ButtonCreateUserComponent />
            <ButtonUpdateUserComponent />
            <ButtonDeleteUserComponent />
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import UserAdditionalInformationSubsection from './subsection-additional-information/user-additional-information.subsection.vue';
import UserCredentialSubsection from './subsection-credentials/user-credential.subsection.vue';
import UserDetailsSubsection from './subsection-details/user-details.subsection.vue';
import ButtonCreateUserComponent from '../buttons/button-create-user.component.vue';
import ButtonDeleteUserComponent from '../buttons/button-delete-user.component.vue';
import ButtonDeselectUserComponent from '../../buttons/button-deselect-user.component.vue';
import ButtonRevertUserChangesComponent from '../buttons/button-revert-user-changes.component.vue';
import ButtonUpdateUserComponent from '../buttons/button-update-user.component.vue'
import { mapGetters } from 'vuex';

export default {
    components: {
        ButtonCreateUserComponent,
        ButtonDeleteUserComponent,
        ButtonDeselectUserComponent,
        ButtonRevertUserChangesComponent,
        ButtonUpdateUserComponent,
        UserAdditionalInformationSubsection,
        UserCredentialSubsection,
        UserDetailsSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
    }
};
</script>

<style scoped></style>
