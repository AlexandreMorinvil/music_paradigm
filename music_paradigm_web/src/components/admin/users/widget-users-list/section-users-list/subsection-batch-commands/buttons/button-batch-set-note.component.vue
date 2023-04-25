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
            'isExecutingBatchCommandSetNote',
            'usersBatchCommandNote',
        ]),
        ...mapGetters('managementUsers/listTableSelection', [
            'hasUsersListTableSelection',
            'usersListTableSelectionIdsList',
        ]),
        isLoading() {
            return this.isExecutingBatchCommandSetNote;
        },
        isButtonFrozen() {
            return !this.isExecutingBatchCommandSetNote && this.isExecutingUserCommand;
        },
        isButtonActive() {
            return this.hasUsersListTableSelection;
        },
        text() {
            return UsersBatchCommandsEnum.setNote;
        },
    },
    methods: {
        ...mapActions('managementUsers/batchCommand', ['executeUsersBatchCommandSetNote']),
        handleButtonPress() {
            if (!this.isButtonActive) return;
            let answer = window.confirm(
                'Are you sure you want to set the note for the selected users?\n' +
                'This will overrite the note of all selected users and cannot be undone.'
            );
            if (!answer) return;
            if (!this.usersBatchCommandNote)
                answer = window.confirm(
                    'This will erase the note for all selected users without providing a new value.\n' +
                    'Are you still sure?'
                );
            if (!answer) return;
            this.executeUsersBatchCommandSetNote({
                idsList: this.usersListTableSelectionIdsList,
                note: this.usersBatchCommandNote,
            });
        },
    }
};
</script>

<style scoped></style>
