<template>
    <WidgetSectionContainer title="Assigned Curriculum">
        <template v-slot:topLeft>
            <ButtonRefreshUserProgressionComponent :isSmall="true" :hideIfInactive="true" />
        </template>

        <template v-slot:topRight>
            <ButtonRevertUserCurriculumComponent :isSmall="true" :hideIfInactive="true" />
        </template>

        <UserCurriculumSubsection />
        <UserCurriculumParametersSubsection v-show="existsUserProgressionEditionCurriculumParameters" />

        <template v-slot:buttons>
            <ButtonCreateUserWithCurriculumComponent :hideIfInactive="true" />
            <ButtonAssignCurriculumComponent :hideIfInactive="true" />
            <ButtonAssignParametersComponent :hideIfInactive="true" />
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import { mapGetters } from 'vuex';

import ButtonAssignCurriculumComponent from './buttons/button-assign-curriculum.component.vue';
import ButtonAssignParametersComponent from './buttons/button-assign-parameters.component.vue';
import ButtonCreateUserWithCurriculumComponent from './buttons/button-create-user-with-curriculum.component.vue';
import ButtonRefreshUserProgressionComponent from '../buttons/button-refresh-user-progression.component.vue';
import ButtonRevertUserCurriculumComponent from './buttons/button-revert-user-curriculum.component.vue';
import UserCurriculumParametersSubsection from './parameters-subsection/user-curriculum-parameters.subsection.vue';
import UserCurriculumSubsection from './curriculum-subsection/user-curriculum.subsection.vue';

export default {
    components: {
        ButtonAssignCurriculumComponent,
        ButtonAssignParametersComponent,
        ButtonCreateUserWithCurriculumComponent,
        ButtonRefreshUserProgressionComponent,
        ButtonRevertUserCurriculumComponent,
        UserCurriculumParametersSubsection,
        UserCurriculumSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/progressions/edition', [
            'existsUserProgressionEditionCurriculumParameters',
        ]),
        ...mapGetters('managementUsers/progressions/selection', ['hasSelectedUserProgression']),
    }
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
