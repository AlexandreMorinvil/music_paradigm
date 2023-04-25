<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="blue" :isActive="isButtonActive" :isLoading="isLoading"
        :isFrozen="isButtonFrozen" v-bind="$attrs" :text="text" />
</template>

<script>
import '@/styles/widget-template.css';
import { mapActions, mapGetters } from 'vuex';

import TemplateButtonComponent from '@/components/admin/template/template-button.component.vue';
import { UsersBatchCommandsEnum } from '@/modules/users';

export default {
    components: {
        TemplateButtonComponent,
    },
    computed: {
        ...mapGetters('managementUsers', ['isExecutingUserCommand']),
        ...mapGetters('managementUsers/batchCommand', ['isExecutingBatchCommandRemoveAllTags']),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandRemoveAllTags;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandRemoveAllTags && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection;
        },
        text() {
            return UsersBatchCommandsEnum.removeAllTags;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandRemoveAllTags']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm(
                'Are you sure you want to remove all tags for the selected users?\nThis cannot be undone.'
            );
            if (!answer) return;
            this.executeUsersBatchCommandRemoveAllTags({
                idsList: this.usersListTableSelectionIdsList
            });
        },
    }
};
</script>

<style scoped></style>
