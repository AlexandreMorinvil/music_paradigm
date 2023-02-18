<template>
    <WidgetSectionContainer title="Curriculum Editor">
        <GeneralSettingsSubSection />
        <SessionSettingsSubsection />
    </WidgetSectionContainer>
</template>

<script>
import { mapActions } from 'vuex';

import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';
import SessionSettingsSubsection from './subsection-session-settings/session-settings.subsection.vue';
import GeneralSettingsSubSection from './subsection-general-settings/general-settings.subsection.vue';

export default {
    components: {
        GeneralSettingsSubSection,
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

<style scoped>

</style>
