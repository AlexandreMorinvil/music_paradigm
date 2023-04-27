<template>
    <WidgetSectionContainer title="Curriculum Editor">

        <GeneralSettingsSubSection />
        <SessionsOverviewBoardSubsection />
        <SessionSettingsSubsection />

        <template v-slot:buttons>
            <ButtonCreateCurriculumComponent />
            <ButtonUpdateCurriculumComponent />
            <ButtonDeleteCurriculumComponent />
        </template>

    </WidgetSectionContainer>
</template>

<script>
import { mapActions } from 'vuex';

import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import ButtonCreateCurriculumComponent from './buttons/button-create-curriculum.component.vue';
import ButtonDeleteCurriculumComponent from './buttons/button-delete-curriculum.component.vue';
import ButtonUpdateCurriculumComponent from './buttons/button-update-curriculum.component.vue';
import SessionsOverviewBoardSubsection from './subsection-sessions-board/sessions-overview-board.subsection.vue';
import SessionSettingsSubsection from './subsection-session-settings/session-settings.subsection.vue';
import GeneralSettingsSubSection from './subsection-general-settings/general-settings.subsection.vue';

export default {
    components: {
        ButtonCreateCurriculumComponent,
        ButtonDeleteCurriculumComponent,
        ButtonUpdateCurriculumComponent,
        GeneralSettingsSubSection,
        SessionsOverviewBoardSubsection,
        SessionSettingsSubsection,
        WidgetSectionContainer,
    },
    methods: {
        ...mapActions('experiments', ['fetchAllExperimentsHeaders']),
    },
    mounted() {
        this.fetchAllExperimentsHeaders();
    },
};
</script>

<style scoped></style>
