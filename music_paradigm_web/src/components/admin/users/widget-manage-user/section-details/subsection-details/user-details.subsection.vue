<template>
    <WidgetSubsectionContainer title="Details">
        <UserDetailsComponent />
    </WidgetSubsectionContainer>
</template>

<script>
import WidgetSubsectionContainer from '@/components/admin/widget-subsection.container.vue';

import UserDetailsComponent from './user-details.component.vue';

export default {
    components: {
        UserDetailsComponent,
        WidgetSubsectionContainer,
    },
};
</script>

<style scoped>

</style>
