<template>
    <WidgetSectionContainer title="User Curriculum">
        <template v-slot:topRight>
            <!-- <ButtonRevertUserCurriculumChangesComponent class="small"/> -->
        </template>
        <UserCurriculumSubsection />
        <!-- <UserCurriculumParametersSubsection /> -->
        <template v-slot:buttons>
            <ButtonAssignCurriculumComponent v-if="hasSelectedUser" class="button" />
        </template>
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import { mapGetters } from 'vuex';

import ButtonAssignCurriculumComponent from './buttons/button-assign-curriculum.component.vue';
import UserCurriculumSubsection from './curriculum-subsection/user-curriculum.subsection.vue';

export default {
    components: {
        ButtonAssignCurriculumComponent,
        UserCurriculumSubsection,
        WidgetSectionContainer,
    },
    computed: {
        ...mapGetters('managementUsers/selection', ['hasSelectedUser']),
    }
};
</script>

<style scoped>
.button {
    width: 300px;
}
</style>
