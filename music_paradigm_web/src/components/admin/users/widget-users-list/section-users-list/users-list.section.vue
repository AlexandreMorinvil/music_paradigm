<template>
    <WidgetSectionContainer title="Users List">
        <UsersBatchCommandSubsection />
        <UsersListTableComponent />
    </WidgetSectionContainer>
</template>

<script>
import WidgetSectionContainer from '@/components/admin/widget-section.container.vue';

import UsersBatchCommandSubsection from './subsection-batch-commands/users-batch-command.subsection.vue';
import UsersListTableComponent from './users-list-table/users-list-table.component.vue';

export default {
    components: {
        UsersBatchCommandSubsection,
        UsersListTableComponent,
        WidgetSectionContainer,
    },
};
</script>

<style scoped></style>
