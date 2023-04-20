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
        ...mapGetters('managementUsers/batchCommand', [
            'isExecutingBatchCommandSetPassword',
            'usersBatchCommandIsPasswordSecret',
            'usersBatchCommandPassword',
        ]),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandSetPassword;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandSetPassword && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection;
        },
        text() {
            return UsersBatchCommandsEnum.setPassword;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandSetPassword']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm(
                'Are you sure you want to change the password of the selected users?\n' +
                'This new password would need to be communicated to the users in order for them to login in the future.\n' +
                'This cannot be undone.\n\n' +
                '(Note that the users already logged in will remain logged in)'
            );
            if (!answer) return;
            answer = window.confirm(
                'Have you verified the list of users for which you want to change the password?\n' +
                'Have you clearly noted this list of user which will need to be contacted for providing their new credentials?\n' +
                'Are you still sure you want to proceed?'
            );
            if (!answer) return;
            this.executeUsersBatchCommandSetPassword({
                idsList: this.usersListTableSelectionIdsList,
                password: this.usersBatchCommandPassword,
                isPasswordSecret: this.usersBatchCommandIsPasswordSecret,
            });
        },
    }
};
</script>

<style scoped></style>
