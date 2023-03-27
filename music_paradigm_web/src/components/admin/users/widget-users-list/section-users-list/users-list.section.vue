<template>
    <WidgetSectionContainer title="Users List">
        <template v-slot:topLeft>
            <!-- BUTTON REFRESH -->
        </template>

        <template v-slot:topRight>

        </template>

        <UsersListTableComponent />

    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import UsersListTableComponent from './users-list-table/users-list-table.component.vue';

export default {
    components: {
        UsersListTableComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped></style>
