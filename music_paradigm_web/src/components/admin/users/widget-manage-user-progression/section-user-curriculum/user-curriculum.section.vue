<template>
    <WidgetSectionContainer title="Assigned Curriculum">
        <template v-slot:topRight>
            <ButtonRevertUserCurriculumComponent class="small"/>
        </template>
        <UserCurriculumSubsection />
        <UserCurriculumParametersSubsection />
        <template v-slot:buttons>
            <ButtonCreateUserWithCurriculumComponent v-show="hasCreateUserWithCurriculumButton" />
            <ButtonAssignCurriculumComponent v-show="hasAssignCurriculumButton" />
            <ButtonAssignParametersComponent v-show="hasAssingParametersButton" />
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import { mapGetters } from 'vuex';

import ButtonAssignCurriculumComponent from './buttons/button-assign-curriculum.component.vue';
import ButtonAssignParametersComponent from './buttons/button-assign-parameters.component.vue';
import ButtonCreateUserWithCurriculumComponent from './buttons/button-create-user-with-curriculum.component.vue';
import ButtonRevertUserCurriculumComponent from './buttons/button-revert-user-curriculum.component.vue';
import UserCurriculumParametersSubsection from './parameters-subsection/user-curriculum-parameters.subsection.vue';
import UserCurriculumSubsection from './curriculum-subsection/user-curriculum.subsection.vue';

export default {
    components: {
        ButtonAssignCurriculumComponent,
        ButtonAssignParametersComponent,
        ButtonCreateUserWithCurriculumComponent,
        ButtonRevertUserCurriculumComponent,
        UserCurriculumParametersSubsection,
        UserCurriculumSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        ...mapGetters('managementUsers/progressions', [
            'hasEditedUserProgressionAssignedParameters',
            'hasEditedUserProgressionCurriculumReference',
        ]),
        ...mapGetters('managementUsers/progressions/edition', ['hasUserProgressionEditionCurriculumReference']),
        ...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression']),
        hasAssignCurriculumButton() {
            return this.hasSelectedUser && this.hasEditedUserProgressionCurriculumReference;
        },
        hasAssingParametersButton() {
            return !this.hasAssignCurriculumButton &&
                this.hasSelectedUserProgression &&
                this.hasEditedUserProgressionAssignedParameters;
        },
        hasCreateUserWithCurriculumButton() {
            return !this.hasSelectedUser && this.hasUserProgressionEditionCurriculumReference;
        }
    }
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
