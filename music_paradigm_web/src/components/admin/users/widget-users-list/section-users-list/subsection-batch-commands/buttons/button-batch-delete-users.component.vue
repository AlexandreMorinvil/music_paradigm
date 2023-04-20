<template>
    <TemplateButtonComponent v-on:click="handleButtonPress" color="red" :isActive="isButtonActive" :isLoading="isLoading"
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
        ...mapGetters('managementUsers/batchCommand', ['isExecutingBatchCommandDeleteUsers']),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandDeleteUsers;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandDeleteUsers && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection;
        },
        text() {
            return UsersBatchCommandsEnum.deleteUsers;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandDeleteUsers']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm(
                'Are you sure you want to delete the selected users?\n' +
                'This will delete the users and all the data associated to this user.\n' +
                'This cannot be undone.'
            );
            if (!answer) return;
            if (!this.usersBatchCommandNote)
                answer = window.confirm(
                    'Have you verified the list of users you want to delete?\n' +
                    'Are you still sure you want to proceed?'
                );
            if (!answer) return;
            this.executeUsersBatchCommandDeleteUsers({
                idsList: this.usersListTableSelectionIdsList
            });
        },
    }
};
</script>

<style scoped></style>
