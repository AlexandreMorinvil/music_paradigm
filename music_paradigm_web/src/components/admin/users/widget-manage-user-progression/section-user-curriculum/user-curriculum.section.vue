<template>
    <WidgetSectionContainer title="User Curriculum">
        <template v-slot:topRight>
            <!-- <ButtonRevertUserCurriculumChangesComponent class="small"/> -->
        </template>
        <UserCurriculumSubsection />
        <!-- <UserCurriculumParametersSubsection /> -->
        <template v-slot:buttons>
            <ButtonCreateUserWithCurriculumComponent v-if="hasCreateUserWithCurriculumButton" />
            <ButtonAssignCurriculumComponent v-if="hasAssignCurriculumButton" />
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import { mapGetters } from 'vuex';

import ButtonAssignCurriculumComponent from './buttons/button-assign-curriculum.component.vue';
import ButtonCreateUserWithCurriculumComponent from './buttons/button-create-user-with-curriculum.component.vue';
import UserCurriculumSubsection from './curriculum-subsection/user-curriculum.subsection.vue';

export default {
    components: {
        ButtonAssignCurriculumComponent,
        ButtonCreateUserWithCurriculumComponent,
        UserCurriculumSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
        ...mapGetters('managementUsers/progressions', ['hasEditedUserProgressionCurriculumReference']),
        ...mapGetters('managementUsers/progressions/edition', ['hasUserProgressionEditionCurriculumReference']),
        hasAssignCurriculumButton() {
            return this.hasSelectedUser && this.hasEditedUserProgressionCurriculumReference;
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
