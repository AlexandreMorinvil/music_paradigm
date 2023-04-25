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
            'isExecutingBatchCommandSetGroup',
            'usersBatchCommandGroup',
        ]),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandSetGroup;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandSetGroup && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection;
        },
        text() {
            return UsersBatchCommandsEnum.setGroup;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandSetGroup']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm('Are you sure you want to change the group of the selected users?');
            if (!answer) return;
            this.executeUsersBatchCommandSetGroup({
                idsList: this.usersListTableSelectionIdsList,
                group: this.usersBatchCommandGroup,
            });
        },
    }
};
</script>

<style scoped></style>
